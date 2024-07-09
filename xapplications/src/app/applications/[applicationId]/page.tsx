import { getApplicationAction } from "@/actions/get-application";
import { userHasRoleAction } from "@/actions/user-has-role";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { ExtentedUser } from "@/lib/utils";
import { IQuestion } from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ApplicationForm } from "./(components)/application-form";

export default async function ApplicationPage({
  params,
}: {
  params: { applicationId: string };
}) {
  const session = await getServerSession(authOptions) as ExtentedUser;
  if(!session || !session.user) return redirect("/");

  const application = await getApplicationAction(params.applicationId) as unknown as { id: string, name: string, description: string, status: boolean, notifyOnAccept: boolean, notifyOnDeny: boolean, questions: IQuestion[], neededRole: string};
  if(!application) return redirect("/");

  const hasRole = await userHasRoleAction(session.user.id as string, application.neededRole);

  if(!application.status || application.neededRole !== "" && !hasRole) return (
    <div className="min-h-screen w-full bg-background">
      <Header />
        <div className="px-96 py-12">
          <Card>
              <CardHeader>
              <h1 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl">Error Occured</h1>
              <CardDescription className="text-center">
                This application is currently closed and not accepting any more submissions or you're missing access.
              </CardDescription>
              <CardContent className="text-center pt-8">
                <a href="/applications">
                  <Button>
                    Back to Applications
                  </Button>
                </a>
              </CardContent>
              </CardHeader>
          </Card>
        </div>
    </div>
  )

  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
        <div className="px-96 py-12">
          <Card>
              <CardHeader>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{application.name}</h1>
              <CardDescription>
                {application.description}
              </CardDescription>
              </CardHeader>
            <CardContent>
              <ApplicationForm applicationId={application.id} serializedData={JSON.stringify(application.questions)} />
            </CardContent>
          </Card>
        </div>
    </div>
  );
}