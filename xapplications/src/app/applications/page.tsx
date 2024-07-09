import RadialGradient from "@/components/ui/radial-gradient";
import { Button } from "@/components/ui/button";
import { DEPARTMENT } from "@/config/config";
import { FadeText } from "@/components/ui/fade-text";
import Image from "next/image";
import { Header } from "@/components/header";
import { getAllApplicationsAction } from "@/actions/get-all-applications";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const applications = (await getAllApplicationsAction()) || [];

  return (
    <>
      <div className="relative h-[100vh] items-center text-center pt-0">
        <Header />
        <div className="pt-20">
          <h1 className="text-6xl font-semibold tracking-wide">Applications</h1>
          <p className="max-w-[700px] text-center mx-auto pt-4">
            Select one of the applications below to apply for a department or
            sub-department.
          </p>
          <div className="pt-12 grid grid-cols-3 text-left gap-8 px-64">
            {applications.map((application) => (
              <Card className="shadow-xl flex-col justify-between" key={application.id}>
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle className="text-[16px] font-semibold">
                      {application.name}
                    </CardTitle>
                    <Badge className={`${application.status ? "bg-green-800/80 text-white" : "bg-red-800/80 text-red-100 hover:bg-red-800/50"}`}>
                      {application.status ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <CardDescription className="pt-2">{application.description}</CardDescription>
                </CardHeader>
                <CardFooter className="space-x-4">
                  <a href={`/applications/${application.id}`} className="w-full">
                    <Button className="w-full">
                      Apply Now
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
