"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import otpSchema from "@/validations/otp.validation";

// Infer the form data type from the schema
type TOtpVerificationFormValues = z.infer<typeof otpSchema>;

const OtpVerificationForm = () => {
  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<TOtpVerificationFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: TOtpVerificationFormValues) => {
    // Simulate an API call
    console.log("OTP submitted:", data);
    // Add your OTP verification logic here (e.g., API call)
  };

  // Simulate resend code (e.g., after 60 seconds)
  const handleResendCode = () => {
    console.log("Resend code requested");
    // Add your resend logic here (e.g., API call, timer)
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
          <Link href="/auth/login" className="flex items-center gap-3">
            <ArrowLeft className="!w-5 !h-5" />
            <span>Back to login</span>
          </Link>
        </Button>
        <div className="text-center mb-8 mt-10">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            OTP Verification
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Field */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      onChange={(value) => field.onChange(value)}
                      className="flex !justify-center"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 w-12 rounded-lg text-center"
                        />
                        <InputOTPSlot
                          index={1}
                          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 w-12 rounded-lg text-center"
                        />
                        <InputOTPSlot
                          index={2}
                          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 w-12 rounded-lg text-center"
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator className="text-muted-foreground" />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3}
                          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 w-12 rounded-lg text-center"
                        />
                        <InputOTPSlot
                          index={4}
                          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 w-12 rounded-lg text-center"
                        />
                        <InputOTPSlot
                          index={5}
                          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 w-12 rounded-lg text-center"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-2">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-primary hover:underline"
                >
                  Resend Code
                </button>
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-lg font-medium"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
