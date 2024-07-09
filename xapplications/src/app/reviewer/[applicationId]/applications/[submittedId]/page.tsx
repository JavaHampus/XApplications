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
  Paperclip,
  Search,
  Settings,
  Text,
  Trophy,
  User,
  UserSearch,
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
import { getSubmittedAction } from "@/actions/reviewer/get-submitted";
import { ISubmitted } from "@/schemas/submitted";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSubmittedDiscordAction } from "@/actions/reviewer/get-submitted-discord";
import { Actions } from "./(components)/actions";

export default async function ReviewerPage({
  params,
}: {
  params: { applicationId: string; submittedId: string };
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
  const submitted = (await getSubmittedAction(
    params.applicationId,
    params.submittedId
  )) as unknown as ISubmitted;
  if (!submitted)
    return redirect(`/reviewer/${params.applicationId}/applications`);

  const account = (await getSubmittedDiscordAction(
    params.applicationId,
    params.submittedId,
    submitted.userId
  )) as any;
  if (!account)
    return redirect(`/reviewer/${params.applicationId}/applications`);

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
        <div className="px-16 py-12 grid grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex flex-row space-x-3">
                <Text className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
                <div>
                  <CardTitle className="text-[20px]">Answers</CardTitle>
                  <CardDescription>
                    The answers to the questions that were submitted.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {submitted.answers.map((question) => (
                <div key={question.question} className="space-y-2">
                  <Label>{question.question}</Label>
                  <Textarea
                    defaultValue={question.answer}
                    disabled
                    rows={Math.max(3, question.answer.split('\n').length)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="max-h-96">
            <CardHeader>
              <div className="flex flex-row space-x-3">
                <UserSearch className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
                <div>
                  <CardTitle className="text-[20px]">
                    Applicant Information
                  </CardTitle>
                  <CardDescription>
                    Information about the applicant who submitted this
                    application.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-semibold">
                Discord Username:{" "}
                <span className="font-normal">{account.user.username}</span>
              </p>
              <p className="text-sm font-semibold">
                Discord ID:{" "}
                <span className="font-normal">{account.user.id}</span>
              </p>
              <p className="text-sm font-semibold">
                Global Name:{" "}
                <span className="font-normal">{account.user.global_name}</span>
              </p>
              {submitted.status == "REVIEWING" && (
                <Actions
                  applicationId={params.applicationId}
                  submittedId={params.submittedId}
                  userId={submitted.userId}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
