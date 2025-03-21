"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  
  let errorMessage = "An error occurred during authentication.";
  
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid email or password. Please try again.";
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage = "This email is already associated with another account. Please sign in using your original provider.";
  } else if (error === "OAuthSignin") {
    errorMessage = "Error signing in with OAuth provider. Please try again.";
  } else if (error === "AccessDenied") {
    errorMessage = "Access denied. You do not have permission to access this resource.";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-destructive">Authentication Error</CardTitle>
          <CardDescription>
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please try again or contact support if the problem persists.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/login">
              Return to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}