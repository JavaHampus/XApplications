"use client";

import { addReviewerAction } from "@/actions/admin/add-reviewer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const AddReviewer = ({ applicationId }: { applicationId: string }) => {
  const [reviewer, setReviewer] = useState<string>("");

  const handleAddReviewer = async () => {
    const add = await addReviewerAction(applicationId, reviewer);

    if(!add) return toast.error("Failed to add reviewer to the application.");
  }

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
            <Button variant="ghost" onClick={handleAddReviewer} className="px-0 hover:bg-transparent">
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
