"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import loginSchema from "@/validations/login.validation";
import Link from "next/link";
import handleMutation from "@/utils/handleMutation";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/slice/authSlice";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "alainmtzadmin@gmail.com",
      password: "admin123",
      rememberPassword: false,
    },
  });

  const onSuccess = (res: any) => {
    console.log("Login response:", res);
    dispatch(
      setUser({
        user: res.data.user,
        token: res.data.accessToken,
      })
    );
    router.push(redirectUrl);
  };

  const onSubmit = async (data: LoginFormValues) => {
    const payload = { email: data.email, password: data.password };
    await handleMutation(payload, login, "Logging in...", onSuccess);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-[600px] bg-card rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            Login to Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Please enter your email and password to continue
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Display General Error */}
            {form.formState.errors.root && (
              <p className="text-destructive text-sm text-center">
                {form.formState.errors.root.message}
              </p>
            )}

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

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder=""
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Password and Forgot Password */}
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-card-foreground font-normal cursor-pointer">
                        Remember Password
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground hover:text-card-foreground p-0 h-auto font-normal"
              >
                <Link href={"/auth/forget-password"}>Forgot Password</Link>
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-lg font-medium"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
