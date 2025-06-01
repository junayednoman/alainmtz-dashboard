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
import forgetPasswordValidation from "@/validations/forgetPassword.validation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type TForgetPasswordFormValues = z.infer<typeof forgetPasswordValidation>;

const ForgetPasswordForm = () => {
  const form = useForm<TForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordValidation),
  });

  const onSubmit = (data: TForgetPasswordFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-[600px] bg-card rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <Button
          type="button"
          variant="link"
          className="text-card-foreground p-0 h-auto text-lg font-medium"
        >
          <Link href={"/auth/login"} className="flex items-center gap-3">
            <ArrowLeft className="!w-5 !h-5" />
            <span> Back to login</span>
          </Link>
        </Button>
        <div className="text-center mb-8 mt-10">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            Forget Password
          </h1>
          <p className="text-muted-foreground text-sm">
            Please enter your email to reset your password
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground font-medium">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder=""
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-lg font-medium"
            >
              Send Code
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
