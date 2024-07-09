import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ExtentedUser } from "@/lib/utils";
import { DEPARTMENT } from "@/config/config";
import { getAllApplicationsAction } from "@/actions/get-all-applications";
import {
  BarChart,
  Check,
  CircleDashed,
  Clock,
  FileSearch,
  Hash,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  Trophy,
  User,
  WatchIcon,
  X,
} from "lucide-react";
import { getReviewersAction } from "@/actions/reviewer/get-reviewers";
import Image from "next/image";
import { getApplicationAction } from "@/actions/reviewer/get-application";
import { IApplication } from "@/schemas/applications";
import { getApplicationStatsAction } from "@/actions/reviewer/get-application-stats";
import { getTopReviewerAction } from "@/actions/reviewer/get-top-reviewer";
import { getSubmittedListAction } from "@/actions/reviewer/get-submitted-list";
import { Actions } from "./(components)/actions";
import { SearchApplication } from "./(components)/search-application";

export default async function ReviewerPage({
  params,
}: {
  params: { applicationId: string };
}) {
  const session = (await getServerSession(authOptions)) as ExtentedUser;
  if (!session || !session.user) return redirect("/");

  const reviewers = await getReviewersAction(params.applicationId);
  if (!reviewers || !reviewers?.includes(session.user.id as string))
    return redirect("/");

  const application = (await getApplicationAction(
    params.applicationId
  )) as unknown as IApplication;
  if (!application) return redirect("/");

  const submitted = (await getSubmittedListAction(params.applicationId)) as
    | any[]
    | [];

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-background">
      <aside className="border-r border-border px-4 py-6">
        <Image
          src={DEPARTMENT.LOGO}
          alt="User Image"
          width={130}
          height={130}
          className="rounded-full text-center mx-auto"
        />
        <nav className="mt-8 space-y-2">
          <Link
            href={`/reviewer/${params.applicationId}`}
            className="flex items-center gap-3 text-[14px] rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2 items-center gap-3 text-[14px] px-3 py-2 text-muted-foreground"
            prefetch={false}
          >
            <FileSearch className="h-5 w-5" />
            <span>Applications</span>
          </Link>
        </nav>
      </aside>
      <main className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-16">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{application.name}</h1>
          </div>
          <div>
            <a href="/" className="text-sm">
              Home -{">"}
            </a>
          </div>
        </header>
        <div className="px-16 pt-12">
          <Card>
            <CardHeader>
              <div className="flex flex-row space-x-3">
                <Search className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
                <div>
                  <CardTitle className="text-[20px]">Search</CardTitle>
                  <CardDescription>
                    Search for applications by User ID.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SearchApplication applicationId={application.id} />
            </CardContent>
          </Card>
        </div>
        <div className="px-16 pt-12">
          <Card>
            <CardHeader>
              <div className="flex flex-row space-x-3">
                <Clock className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
                <div>
                  <CardTitle className="text-[20px]">Pending Applications</CardTitle>
                  <CardDescription>
                    Applications that are waiting for review.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submitted
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((submit) => (
                      <TableRow key={submit.id}>
                        <TableCell>{submit.userId}</TableCell>
                        <TableCell>
                          <Badge>REVIEWING</Badge>
                        </TableCell>
                        <TableCell>{submit.submittedId}</TableCell>
                        <TableCell>
                          {new Date(submit.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right space-x-3">
                          <Actions
                            applicationId={application.id}
                            submittedId={submit.submittedId}
                            userId={submit.userId}
                          />
                          <a
                            href={`/reviewer/${params.applicationId}/applications/${submit.submittedId}`}
                          >
                            <Button variant="secondary">View</Button>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
