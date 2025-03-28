import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <NavBar variant="dark" />
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-black text-white">
        <div className="flex items-center justify-center gap-6 mb-10">
          <h1 className="text-6xl font-bold">404</h1>
          <div className="h-12 w-px bg-gray-600"></div>
          <p className="text-xl">This page could not be found.</p>
        </div>
        <Button asChild variant="gradient" className="rounded-full">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
      <Footer variant="dark" />
    </>
  );
}
