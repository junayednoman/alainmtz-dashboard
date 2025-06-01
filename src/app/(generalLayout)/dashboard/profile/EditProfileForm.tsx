"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const editProfileSchema = z.object({
  userName: z
    .string()
    .min(1, "User name is required")
    .min(2, "User name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  contactNo: z
    .string()
    .min(1, "Contact number is required")
    .min(10, "Contact number must be at least 10 digits"),
});

type EditProfileFormValues = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
  defaultValues?: Partial<EditProfileFormValues>;
  onSubmit: (data: EditProfileFormValues) => void;
}

const EditProfileForm = ({ defaultValues, onSubmit }: EditProfileFormProps) => {
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      userName: defaultValues?.userName || "",
      email: defaultValues?.email || "",
      contactNo: defaultValues?.contactNo || "",
    },
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary-foreground text-center">
        Edit Your Profile
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">User Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="bg-background border-border text-foreground h-12 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-background border-border text-foreground h-12 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Contact no</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your contact number"
                    className="bg-background border-border text-foreground h-12 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-lg font-medium"
          >
            Save & Change
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
