import { getAllApplicationsAction } from "@/actions/get-all-applications";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default async function Home() {
  const applications = (await getAllApplicationsAction()) || [];

  return (
    <>
      <div className="relative h-[100vh] items-center text-center pt-0">
        <Header />
        <div className="pt-20">
          <h1 className="text-6xl font-semibold tracking-wide">Reviewer Dashboard</h1>
          <p className="max-w-[700px] text-center mx-auto pt-4">
            Select which application type you would like to review.
          </p>
          <div className="pt-12 grid grid-cols-3 text-left gap-8 px-64">
            {applications.map((application) => (
              <Card className="shadow-xl flex-col justify-between" key={application.id}>
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle className="text-[16px] font-semibold">
                      {application.name}
                    </CardTitle>  
                  </div>
                </CardHeader>
                <CardFooter className="space-x-4">
                  <a href={`/reviewer/${application.id}`} className="w-full">
                    <Button className="w-full">
                      View Dashboard
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
