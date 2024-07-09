import RadialGradient from "@/components/ui/radial-gradient";
import { Button } from "@/components/ui/button";
import { DEPARTMENT } from "@/config/config";
import { FadeText } from "@/components/ui/fade-text";
import Image from "next/image";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
      <div className="relative h-[100vh] items-center text-center pt-0">
        <Header />
        <div className="pt-20">
          <RadialGradient size={750} />
          <Image
            width={200}
            height={200}
            alt="Department Logo"
            className="text-center mx-auto pb-8"
            src={DEPARTMENT.LOGO}
          />
          <FadeText
            text={DEPARTMENT.NAME}
            className="text-6xl font-semibold tracking-wide"
          />
          <p className="max-w-[700px] text-center mx-auto pt-4">
            {DEPARTMENT.DESCRIPTION}
          </p>
          <div className="pt-7 space-x-8">
            <a href="/applications">
              <Button className="rounded-sm">View Applications -{">"}</Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
