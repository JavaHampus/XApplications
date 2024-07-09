"use client";

import { editApplicationAction } from "@/actions/admin/edit-application";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditFormProps {
  applicationId: string;
  name: string;
  description: string;
  status: boolean;
  acceptedRole: string;
  notifyOnAccept: boolean;
  notifyOnDeny: boolean;
  neededRole?: string;
}

const applicationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters." })
    .max(250, { message: "Description must be at most 250 characters." }),
  status: z.literal("Open").or(z.literal("Closed")),
  acceptedRole: z.string().length(19),
  notifyOnAccept: z.literal("Yes").or(z.literal("No")),
  notifyOnDeny: z.literal("Yes").or(z.literal("No")),
  neededRole: z.string().length(19).optional().or(z.literal("")),
});

export const EditForm = (application: EditFormProps) => {
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: application.name,
      description: application.description,
      status: application.status ? "Open" : "Closed",
      acceptedRole: application.acceptedRole,
      notifyOnAccept: application.notifyOnAccept ? "Yes" : "No",
      notifyOnDeny: application.notifyOnDeny ? "Yes" : "No",
      neededRole: application.neededRole || "",
    },
  });

  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    console.log(values);

    const submit = await editApplicationAction(
      application.applicationId,
      values.name,
      values.description,
      values.status,
      values.acceptedRole,
      values.notifyOnAccept,
      values.notifyOnDeny,
      values.neededRole || ""
    );

    if (!submit) return toast.error("Failed to edit application.");

    toast.success("Application has been edited successfully.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  This is the name of the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Short description of the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={application.status ? "Open" : "Closed"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={application.status ? "Open" : "Closed"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  This is the status of the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptedRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accepted Role</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Will be assigned to the user when accepted.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notifyOnAccept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notify on Accepted</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={application.notifyOnAccept ? "Yes" : "No"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={application.notifyOnAccept ? "Yes" : "No"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Notify the applicant when accepted.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notifyOnDeny"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notify on Denied</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={application.notifyOnDeny ? "Yes" : "No"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={application.notifyOnDeny ? "Yes" : "No"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Notify the applicant when denied.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neededRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Needed Role (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Role needed to submit the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row space-x-3">
          <Button type="submit" className="mt-12">
            Submit Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
