import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Helper to extract Cloudflare R2 configuration from naming variations
function getS3Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CLOUDFLARE_R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID || "";
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID || "";
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY || "";
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET || process.env.CLOUDFLARE_R2_BUCKET_NAME || process.env.R2_BUCKET || process.env.R2_BUCKET_NAME || process.env.NEXT_PUBLIC_R2_BUCKET || "";

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    isConfigured: !!accountId && !!accessKeyId && !!secretAccessKey && !!bucketName
  };
}

interface RouteParams {
  params: Promise<{ filename: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { filename } = await params;
  const config = getS3Config();
  const key = `blog-images/${filename}`;

  try {
    if (!config.isConfigured) {
      throw new Error("CredentialsProviderError");
    }

    const s3Client = new S3Client({
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: "auto",
    });

    const s3Response = await s3Client.send(
      new GetObjectCommand({
        Bucket: config.bucketName,
        Key: key,
      })
    );

    if (!s3Response.Body) {
      return new NextResponse("Image body empty", { status: 404 });
    }

    // Convert S3 stream data to byte array buffer
    const arrayBuffer = await s3Response.Body.transformToByteArray();
    
    // Return standard stream response with accurate headers
    return new NextResponse(arrayBuffer as any, {
      headers: {
        "Content-Type": s3Response.ContentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error(`R2 Fetch error for key ${key}:`, error);
    
    // Fallback placeholder during local dev if R2 credentials are unset
    if (error.name === "CredentialsProviderError" || error.code === "NoSuchKey") {
      return new NextResponse("Image not found", { status: 404 });
    }
    
    return new NextResponse("Failed to stream image", { status: 500 });
  }
}
