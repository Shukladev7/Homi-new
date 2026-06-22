import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

export async function POST(req: NextRequest) {
  // 1. Verify admin session authorization
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Compress and buffer file data
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const key = `blog-images/${fileName}`;

    // Check if Cloudflare R2 is configured using resolved credentials
    const config = getS3Config();

    if (config.isConfigured) {
      const s3Client = new S3Client({
        endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
        region: "auto",
      });

      // 3. Upload to Cloudflare R2 Object Storage
      await s3Client.send(
        new PutObjectCommand({
          Bucket: config.bucketName,
          Key: key,
          Body: buffer,
          ContentType: file.type || "image/jpeg",
        })
      );

      // 4. Resolve URL
      // If public bucket domain is set, return direct link; otherwise, return local stream route
      const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
        ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`
        : `/api/blog-images/${fileName}`;

      return NextResponse.json({ url: publicUrl });
    } else {
      // Local fallback: save file directly to public/uploads directory
      const fs = await import("fs");
      const path = await import("path");
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      
      console.log(`Cloudflare R2 not configured. Saved uploaded image locally to: ${filePath}`);
      return NextResponse.json({ url: `/uploads/${fileName}` });
    }
  } catch (error: any) {
    console.error("R2 Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image to R2" }, { status: 500 });
  }
}
