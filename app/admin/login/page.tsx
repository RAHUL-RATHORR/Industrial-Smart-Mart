import { Suspense } from "react";
import AdminLoginPage from "./AdminLoginPage";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100" />}>
      <AdminLoginPage />
    </Suspense>
  );
}
