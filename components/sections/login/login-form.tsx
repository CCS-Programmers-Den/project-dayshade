"use client";

import { useActionState } from "react";
import { login } from "@/app/(auth)/login/actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { LoginState } from "@/lib/validation/auth";

const initialState: LoginState = {
  errors: {},
  error: undefined,
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    initialState
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">PD Superadmin Login</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Superadmin account
                </p>
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="off"
                />
                {state.errors.email && (
                  <p className="text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
                {state.errors.password && (
                  <p className="text-sm text-red-500">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>

              {/* Global error */}
              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              <Button type="submit" disabled={pending}>
                {pending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/assets/logo_blk.png"
              alt="Image"
              fill
              priority
              className="absolute inset-0 h-full w-full object-cover p-10 bg-primary"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
