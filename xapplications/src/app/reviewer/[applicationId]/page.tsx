import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
import { BarChart, Check, CircleDashed, FileSearch, Hash, Home, LayoutDashboard, Settings, Trophy, User, X } from "lucide-react";
import { getReviewersAction } from "@/actions/reviewer/get-reviewers";
import Image from "next/image";
import { getApplicationAction } from "@/actions/reviewer/get-application";
import { IApplication } from "@/schemas/applications";
import { StatsChart } from "./(components)/stats-chart";
import { getApplicationStatsAction } from "@/actions/reviewer/get-application-stats";
import { getTopReviewerAction } from "@/actions/reviewer/get-top-reviewer";

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

  const stats = await getApplicationStatsAction(params.applicationId);
/*   const topReviewer = await getTopReviewerAction(params.applicationId);
  console.log(topReviewer); */

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
            href="#"
            className="flex rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2 items-center gap-3 text-[14px] px-3 py-2 text-muted-foreground"
            prefetch={false}
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href={`/reviewer/${application.id}/applications`}
            className="flex items-center gap-3 text-[14px] rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
        <div className="grid grid-cols-4 gap-8 px-16 pt-12">
          <Card>
            <CardHeader>
              <CircleDashed className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">
                {stats?.reviewing || 0}
              </h1>
              <p className="text-sm text-slate-800/70">Pending Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Check className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">
                {stats?.accepted || 0}
              </h1>
              <p className="text-sm text-slate-800/70">Approved Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <X className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">
                {stats?.rejected || 0}
              </h1>
              <p className="text-sm text-slate-800/70">Denied Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Hash className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <h1 className="text-2xl font-bold tracking-wide">
                {stats?.total || 0}
              </h1>
              <p className="text-sm text-slate-800/70">Total Applications</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-8 px-16 pt-12">
          <Card className="col-span">
            <CardHeader>
              <div className="flex flex-row space-x-3">
                <Trophy className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
                <div>
                  <CardTitle className="text-[20px]">Top Reviewer</CardTitle>
                  <CardDescription>The officer with the most reviewed applications.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-600 text-sm">Coming Soon</p>
              {/* { topReviewer === false && (
                <p className="text-sm text-slate-800/70">No reviewers found or the top reviewer has left the server.</p>
              )}
              { topReviewer && (
                <div className="flex flex-col space-y-3 text-[15px]">
                    <p className="text-slate-700 font-semibold">Name: <span className="font-normal">
                      {topReviewer.name}  
                    </span></p>
                    <p className="text-slate-700 font-semibold">Discord ID: <span className="font-normal">
                      {topReviewer.id}  
                    </span></p>
                    <p className="text-slate-700 font-semibold">Global Name: <span className="font-normal">
                      {topReviewer.globalName}  
                    </span></p>
                    <p className="text-slate-700 font-semibold">Reviews: <span className="font-normal">
                      {topReviewer.reviews}  
                    </span></p>
                    <p className="text-slate-700 font-semibold">Nickname: <span className="font-normal">
                      {topReviewer.nick || "None"}  
                    </span></p>
                </div>
              )} */}
            </CardContent>
          </Card>
          <Card className="col-span">
            <CardHeader>
              <div className="flex flex-row space-x-3">
                <BarChart className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
                <div>
                  <CardTitle className="text-[20px]">
                    Statistics 
                  </CardTitle>
                  <CardDescription>Statistics over application data.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <StatsChart pending={stats?.reviewing || 0} accepted={stats?.accepted || 0} denied={stats?.rejected || 0} total={stats?.total || 0} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
