import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ApplicationForm } from "./(components)/application-form";

export default async function AdminPage() {
  const session = await getServerSession(authOptions) as ExtentedUser;
  if(!session || !session.user) return redirect("/");

  if(session.user.id !== DEPARTMENT.OWNER) return redirect("/");

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-24">
          <div className="flex-1">
            <a href="/admin" className="text-lg font-semibold">Admin Dashboard</a>
          </div>
          <div>
            <a href="/" className="text-sm">
              Home -{">"}
            </a>
          </div>
        </header>
        <div className="px-24 pt-12">
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div className="flex flex-col">
                <CardTitle className="text-xl">
                  New Application
                </CardTitle>
                <CardDescription>
                  Create a new application that users can apply for.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ApplicationForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}