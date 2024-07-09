import { getApplicationAction } from "@/actions/admin/get-application";
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
import { IApplication } from "@/schemas/applications";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { EditForm } from "./(components)/edit-form";
import { QuestionTable } from "./(components)/question-table";

export default async function AdminPage({
  params,
}: {
  params: { applicationId: string };
}) {
  const session = (await getServerSession(authOptions)) as ExtentedUser;
  if (!session || !session.user) return redirect("/");

  if (session.user.id !== DEPARTMENT.OWNER) return redirect("/");

  const application = (await getApplicationAction(
    params.applicationId
  )) as unknown as IApplication;
  if (!application) return redirect("/admin");

  return (
    <div className="min-h-screen w-full bg-background">
      {/*       <aside className="border-r border-border bg-muted/40 px-4 py-6">
        <h1 className="px-3 font-semibold tracking-wide text-xl">
          Admin Dashboard
        </h1>
        <nav className="mt-8 space-y-2">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <FileTextIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            <span>Applicants</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <ShieldIcon className="h-5 w-5" />
            <span>Background Checks</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside> */}
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
        {/*         <div className="grid grid-cols-4 gap-8 px-24 pt-12">
          <Card>
            <CardHeader>
              <CircleDashed className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">1</h1>
              <p className="text-sm text-slate-800/70">Pending Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Check className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">294</h1>
              <p className="text-sm text-slate-800/70">Approved Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <X className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">121</h1>
              <p className="text-sm text-slate-800/70">Rejected Applications</p>
            </CardContent>
          </Card>
          <Card>
          <CardHeader>
              <Hash className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">1020</h1>
              <p className="text-sm text-slate-800/70">
                Total Applications
              </p>
            </CardContent>
          </Card>
        </div> */}
        <div className="px-24 py-12 space-y-12">
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div className="flex flex-col">
                <CardTitle className="text-xl">
                  Edit Application - #{application.id.toUpperCase()}
                </CardTitle>
                <CardDescription>
                  Edit the application and manage the application process.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <EditForm
                applicationId={application.id}
                name={application.name}
                description={application.description}
                status={application.status}
                acceptedRole={application.acceptedRole}
                notifyOnAccept={application.notifyOnAccept}
                notifyOnDeny={application.notifyOnDeny}
                neededRole={application.neededRole}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div className="flex flex-col">
                <CardTitle className="text-xl">Application Questions</CardTitle>
                <CardDescription>
                  Manage the questions for the application.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex-1 overflow-auto py-6">
                <QuestionTable applicationId={application.id} appQuestions={application.questions} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}