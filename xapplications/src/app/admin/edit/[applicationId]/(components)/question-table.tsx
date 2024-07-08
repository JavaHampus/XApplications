"use client";

import { IQuestion } from "@/schemas/applications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveHorizontalIcon } from "lucide-react";
import { QuestionRow } from "./question-row";
import { useEffect, useState } from "react";
import { AddQuestion } from "./add-question";

interface QuestionProps {
  question: string;
  type: string;
  required: boolean;
}

export const QuestionTable = ({ applicationId, appQuestions }: any) => {
  const [questions, setQuestions] = useState<IQuestion[]>(appQuestions || []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Required</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions &&
            questions
              .sort((a, b) => a.position - b.position)
              .map((question: any, index: any) => (
                <QuestionRow
                  key={index}
                  applicationId={applicationId}
                  position={question.position}
                  question={question.question}
                  type={question.type}
                  required={question.required}
                  setQuestions={setQuestions}
                />
              ))}
        </TableBody>
      </Table>
      <AddQuestion applicationId={applicationId} setQuestions={setQuestions} />
    </>
  );
};
