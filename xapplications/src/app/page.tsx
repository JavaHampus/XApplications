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
          <RadialGradient size={3000} />
          <Image
            width={200}
            height={200}
            alt="Department Logo"
            className="text-center mx-auto pb-8"
            src="https://cdn.discordapp.com/attachments/1253288773186359357/1258727281929617498/dcel81w-50ab24ee-f2a3-4de4-85f9-9b19a52c529b.png?ex=668918a2&is=6687c722&hm=bb75aad104c676021b5f48770b68f981c7ab2b33169f69a28f4cc8de84ad5b7a&"
          />
          <FadeText
            text={DEPARTMENT.NAME}
            className="text-6xl font-semibold tracking-wide"
          />
          <p className="max-w-[700px] text-center mx-auto pt-4">
            {DEPARTMENT.DESCRIPTION}
          </p>
          <div className="pt-7 space-x-8">
            <Button className="rounded-sm">View Applications -{">"}</Button>
            <Button className="rounded-sm" variant="ghost">
              Join Discord
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
