"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { signupSchema, SignupSchema } from "@/schemas/signup-schema";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupSchema) => {
    setLoading(true);
    setFormError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
        },
      },
    });

    if (signUpError) {
      setFormError(signUpError.message);
      toast.error("Register unsuccessful!", {
        description: signUpError.message,
      });
    }

    toast.success("Account Created", {
      description: "You are being redirected to the login page.",
    });

    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                {...form.register("fullName")}
              />
              <FieldDescription className="text-red-600">
                {form.formState.errors.fullName?.message}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...form.register("email")}
              />
              <FieldDescription className="text-red-600">
                {form.formState.errors.email?.message}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                {...form.register("password")}
              />
              <FieldDescription className="text-red-600">
                {form.formState.errors.password?.message}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                {...form.register("confirmPassword")}
              />
              <FieldDescription className="text-red-600">
                {" "}
                {form.formState.errors.confirmPassword?.message}
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                {formError && (
                  <p className="text-sm text-red-500 text-center">
                    {formError}
                  </p>
                )}
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={loading}
                  className="cursor-pointer"
                  onClick={async () => {
                    toast.loading("You are being redirected via Google...");
                    await supabase.auth.signInWithOAuth({
                      provider: "google",
                      options: {
                        redirectTo: `${location.origin}/auth/callback`,
                      },
                    });
                  }}
                >
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
