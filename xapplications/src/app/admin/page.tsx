import { getAllApplicationsAction } from "@/actions/get-all-applications";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEPARTMENT } from "@/config/config";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AddReviewer } from "./(components)/add-reviewer";

export default async function AdminPage() {
  const session = (await getServerSession(authOptions)) as ExtentedUser;
  if (!session || !session.user) return redirect("/");

  if (session.user.id !== DEPARTMENT.OWNER) return redirect("/");

  const applications = (await getAllApplicationsAction()) || [];

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-24">
          <div className="flex-1">
            <a href="/admin" className="text-lg font-semibold">
              Admin Dashboard
            </a>
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
                  Department Applications
                </CardTitle>
                <CardDescription>
                  View and manage all department applications.
                </CardDescription>
              </div>
              <a href="/admin/create">
                <Button>Create New</Button>
              </a>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-8">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <CardTitle className="text-[15px] font-semibold">
                      {application.name}
                    </CardTitle>
                    <CardDescription>
                      {application.description.slice(0, 70) + "..."}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="space-x-4">
                    <a href={`/admin/edit/${application.id}`}>
                      <Button
                        variant="ghost"
                        className="px-0 hover:bg-transparent"
                      >
                        Edit Application
                      </Button>
                    </a>
                    <AddReviewer applicationId={application.id} />
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}