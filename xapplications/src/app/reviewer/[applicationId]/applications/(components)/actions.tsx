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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Manage</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleAccept}>
          <Check size={16} />
          <DropdownMenuLabel>Accept</DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <X size={16} />
          <DropdownMenuLabel onClick={handleDeny}>Reject</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
