"use client"

import { acceptSubmittedAction } from "@/actions/reviewer/accept-application";
import { denySubmittedAction } from "@/actions/reviewer/deny-application";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface ActionsProps {
    applicationId: string;
    submittedId: string;
    userId: string;
}

export const Actions = ({ applicationId, submittedId, userId }: ActionsProps) => {
  const handleAccept = async () => {
    const accept = await acceptSubmittedAction(applicationId, submittedId, userId);

    if(!accept) return toast.error("Failed to accept application.");

    return window.location.reload();
  }
  
  const handleDeny = async () => {
    const deny = await denySubmittedAction(applicationId, submittedId, userId);

    if(!deny) return toast.error("Failed to deny application.");

    return window.location.reload();
  }

  return (
    <div className="space-x-3 pt-8">
      <Button onClick={handleAccept} className="bg-green-700/70 hover:bg-green-700/90">
        Accept Application
      </Button>
      <Button variant="destructive" className="bg-red-700/70" onClick={handleDeny}>
        Deny Application
      </Button>
    </div>
  );
};
