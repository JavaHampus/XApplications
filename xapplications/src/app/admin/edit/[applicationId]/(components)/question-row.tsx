import { deleteQuestionAction } from "@/actions/admin/delete-question";
import { moveQuestionPositionAction } from "@/actions/admin/move-question-position";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { IQuestion } from "@/schemas/applications";
import { MoveHorizontalIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface QuestionProps {
  applicationId: string;
    position: number;
  question: string;
  type: string;
  required: boolean;
  setQuestions: Dispatch<SetStateAction<IQuestion[]>>;
}

export const QuestionRow = ({ applicationId, position, question, type, required, setQuestions }: QuestionProps) => {
  const moveUpClick = async () => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.position === position);
      if (index === 0) return prev;

      const newPosition = prev[index - 1].position;
      prev[index].position = newPosition;
      prev[index - 1].position = position;

      return [...prev];
    });

    const action = await moveQuestionPositionAction(applicationId, position, position - 1, "UP");
    console.log(action);

    return toast.success("Question moved up successfully");
  }

  const moveDownClick = async () => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.position === position);
      if (index === prev.length - 1) return prev;

      const newPosition = prev[index + 1].position;
      prev[index].position = newPosition;
      prev[index + 1].position = position;

      return [...prev];
    });

    const action = await moveQuestionPositionAction(applicationId, position, position + 1, "DOWN");
    console.log(action);

    return toast.success("Question moved down successfully");
  }

  const deleteClick = async () => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.position === position);
      prev.splice(index, 1);

      // Reorder the questions with the new position
      prev.forEach((q, i) => {
        q.position = i + 1;
      });

      return [...prev];
    });

    const action = await deleteQuestionAction(applicationId, position);
    console.log(action);

    return toast.success("Question deleted successfully");
  }
  

  return (
    <TableRow>
        <TableCell>#{position}</TableCell>
      <TableCell className="font-medium">{question.slice(0, 50)}</TableCell>
      <TableCell>
        <Badge variant="secondary">
            {type}
        </Badge>
      </TableCell>
        <TableCell>
            {required ? "Yes" : "No"}
        </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoveHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={moveUpClick}>Move Up</DropdownMenuItem>
            <DropdownMenuItem onClick={moveDownClick}>Move Down</DropdownMenuItem>
            <DropdownMenuItem onClick={deleteClick}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
