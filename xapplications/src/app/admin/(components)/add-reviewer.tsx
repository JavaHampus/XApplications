"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, X } from "lucide-react";
import { useState } from "react";

export const AddReviewer = () => {
  const [reviewer, setReviewer] = useState<string>("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="px-0 hover:bg-transparent">
          Add Reviewer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-row space-x-4">
          <UserPlus className="h-[50px] w-[50px] rounded-lg text-white bg-slate-800 border-2 border-slate-800/20 p-2" />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Add Reviewer</h1>
            <p className="text-slate-600 text-xs">
              They will be able to review applications and manage the
              application process.
            </p>
          </div>
        </div>
        <div className="pt-6 space-y-2">
          <p className="text-slate-600 text-sm font-semibold">Discord ID:</p>
          <Input onChange={(e) => setReviewer(e.target.value)} />
        </div>
        <AlertDialogCancel asChild>
            <Button variant="ghost" className="px-0 hover:bg-transparent">
                Add Reviewer
            </Button>
        </AlertDialogCancel>
        <AlertDialogCancel asChild>
            <Button variant="ghost" className="px-0 hover:bg-transparent">
                Cancel  
            </Button>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
