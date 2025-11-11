import { type ReactNode } from "react";

// Force dynamic rendering for all auth routes
export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
