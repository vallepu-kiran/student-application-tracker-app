import { Suspense } from "react";
import { LoginFormContent } from "@/components/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
