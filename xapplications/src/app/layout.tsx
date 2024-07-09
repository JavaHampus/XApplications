import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Provider from "@/components/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { DEPARTMENT } from "@/config/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: DEPARTMENT.ABBREVIATION + " Portal",
  description: DEPARTMENT.DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <Provider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </Provider>
  );
}
