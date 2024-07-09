"use client";

import { submitApplicationAction } from "@/actions/submit-application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IQuestion } from "@/schemas/applications";
import { useState } from "react";
import { toast } from "sonner";

interface ApplicationFormProps {
  applicationId: string;
  serializedData: string;
}

export const ApplicationForm = ({
  applicationId,
  serializedData,
}: ApplicationFormProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const questions = JSON.parse(serializedData) as IQuestion[];

  const handleSubmit = async () => {
    const submit = await submitApplicationAction(applicationId, answers);
    console.log(submit);
    if(submit) {
      window.location.href = "/applications";
    } else {
      toast.error("Not all required fields are filled out or you have already submitted this application.");
    }
  };

  return (
    <div className="space-y-5">
      {questions
        .sort((a, b) => a.position - b.position)
        .map((question) => (
          <div key={question.position} className="space-y-2">
            {question.type === "SHORT" && (
              <>
                <Label>{question.question}</Label>
                <Input
                  className="w-full p-2 border border-gray-300 rounded-md"
                  type="text"
                  value={answers[question.position] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.position]: e.target.value,
                    }))
                  }
                />
              </>
            )}
            {question.type === "LONG" && (
              <>
                <Label>{question.question}</Label>
                <Textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={answers[question.position] || ""}
                  required
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.position]: e.target.value,
                    }))
                  }
                />
              </>
            )}
          </div>
        ))}
        <div>
        <Button className="mt-4 w-full" onClick={() => handleSubmit()}>Submit Application</Button> 
        </div>
    </div>
  );
};
