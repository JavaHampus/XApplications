import { addQuestionAction } from "@/actions/admin/add-question";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IQuestion, QuestionTypes } from "@/schemas/applications";
import { Quote } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface AddProps {
    applicationId: string;
    setQuestions: Dispatch<SetStateAction<IQuestion[]>>;
}

export const AddQuestion = ({ applicationId, setQuestions }: AddProps) => {
    const [question, setQuestion] = useState<string>("");
    const [type, setType] = useState<QuestionTypes>("SHORT");
    const [required, setRequired] = useState<string>("Yes");

    const addQuestion = async () => {
        setQuestions((prev: IQuestion[]) => [
            ...prev,
            {
                question,
                type,
                required: required === "Yes" ? true : false,
                position: prev.length + 1,
            },
        ]);

        const convertedRequired = required === "Yes" ? true : false;

        const add = await addQuestionAction(applicationId, question, type, convertedRequired);
        console.log(add);
        if (add) {
            setQuestion("");
            setType("SHORT");
            setRequired("Yes");
        }

        return;
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="mt-12">
            Add Question
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-row space-x-4">
            <Quote className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Add Question</h1>
              <p className="text-slate-600 text-xs">
                Add a question to the application form for applicants to answer.
              </p>
            </div>
          </div>
          <div className="pt-6 space-y-2">
            <p className="text-slate-800 text-sm">Question</p>
            <Input onChange={(e) => setQuestion(e.target.value)} />
          </div>
          <div className="space-y-2">
            <p className="text-slate-800 text-sm">Type</p>
            <Select onValueChange={(value) => setType(value as QuestionTypes)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="SHORT">Short Answer</SelectItem>
                    <SelectItem value="LONG">Long Answer</SelectItem>
                    <SelectItem value="CHECKBOX">Checkbox Answer</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 mb-5">
            <p className="text-slate-800 text-sm">Required</p>
            <Select onValueChange={(value) => setRequired(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <AlertDialogCancel asChild>
              <Button variant="ghost" onClick={addQuestion} className="px-0 hover:bg-transparent">
                  Add Question
              </Button>
          </AlertDialogCancel>
          <AlertDialogCancel asChild>
              <Button variant="ghost" className="px-0 hover:bg-transparent">
                  Cancel  
              </Button>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    )
}