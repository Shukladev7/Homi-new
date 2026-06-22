import InteriorHeader from "./InteriorHeader";
import InteriorFooter from "./InteriorFooter";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen bg-[#F8F8F8] text-primary flex flex-col">
      <InteriorHeader />
      <main className="flex-1 w-full">{children}</main>
      <InteriorFooter />
    </div>
  );
}
