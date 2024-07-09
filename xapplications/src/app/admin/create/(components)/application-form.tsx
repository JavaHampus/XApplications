"use client";

import { createApplicationAction } from "@/actions/admin/create-application";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  neededRole: z.string().length(18).optional()
});

export const ApplicationForm = () => {
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "Open",
      acceptedRole: "",
      notifyOnAccept: "Yes",
      notifyOnDeny: "Yes",
    },
  });

  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    const submit = await createApplicationAction(
      values.name,
      values.description,
      values.status,
      values.acceptedRole,
      values.notifyOnAccept,
      values.notifyOnDeny,
      values.neededRole
    )

    if(!submit) return toast.error("Failed to create application.")

    toast.success("Application created successfully. Redirecting...")
    
    window.location.href = `/admin`
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
                  <Input placeholder="LPSD Application" {...field} />
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
                  <Input placeholder="Apply to join LSPD." {...field} />
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
                <FormControl>
                  <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="False">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
                    <Input placeholder="Role ID" {...field} />
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
                <FormControl>
                  <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-xs">
                    Notify the user when accepted.
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
                <FormControl>
                  <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-xs">
                    Notify the user when denied.
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
                  <Input placeholder="Role ID" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Role needed to submit the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-12">Create Application</Button>
      </form>
    </Form>
  );
};
