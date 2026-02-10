"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { login } from "@/lib/actions/auth"
import { useActionState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import PrivacyPolicy from "./privacy-policy"
import TermsOfService from "./terms-of-service"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState(login, {});

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Authenticate System User</CardTitle>
            <CardDescription>
              Enter system credentials for authorization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Username</FieldLabel>
                  <Input
                    id="email"
                    name="username"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" placeholder="e.g. 123" required />
                </Field>
                <Field>
                  <Button type="submit">Login</Button>
                </Field>
              </FieldGroup>
              <CardDescription className="text-red-500 mt-2 text-center font-semibold">
                {state.error}
              </CardDescription>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our {" "}
        <Dialog>
            <DialogTrigger asChild>
              <button className="underline">Terms of Service</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Terms of Service
                </DialogTitle>
              </DialogHeader>
              <div className="h-[80vh] overflow-y-auto">
                <TermsOfService />
              </div>
            </DialogContent>
        </Dialog>
          {" "} and {" "}
          <Dialog>
            <DialogTrigger asChild>
              <button className="underline">Privacy Policy</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Privacy Policy
                </DialogTitle>
              </DialogHeader>
              <div className="h-[80vh] overflow-y-auto">
                <PrivacyPolicy />
              </div>
            </DialogContent>
        </Dialog>
          .
        </FieldDescription>
    </div>
  )
}
