"use client";

import { useRequestMagicLink } from "@/api-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams?: Record<string, string>;
}

export default function LoginModal({
  isOpen,
  onClose,
  searchParams,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const { mutateAsync: requestMagicLink } = useRequestMagicLink();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const data = await requestMagicLink({
        body: {
          email,
          searchParams: searchParams as void,
        },
      });

      setStatus("success");
      setMessage(data?.message || "Check your email for a magic link.");
      setEmail("");
    } catch (error: any) {
      setStatus("error");
      console.error("Magic link request error:", error);

      // Extract error message from different error formats
      const errorMessage =
        error?.payload?.error ||
        error?.message ||
        error?.error ||
        (typeof error === "string" ? error : null) ||
        "Failed to send magic link. Please try again.";

      setMessage(errorMessage);
    }
  };

  const handleClose = () => {
    setEmail("");
    setStatus("idle");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign In Required</DialogTitle>
          <DialogDescription className="text-lg">
            We&apos;ll send you a magic link to sign in without a password.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="text-amber-500 text-6xl mb-3">✓</div>
            <p className="mb-6 text-2xl">{message}</p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="text"
                inputMode="email"
                autoComplete="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
              />
            </div>

            {message && status === "error" && (
              <div className="text-destructive text-xl">{message}</div>
            )}

            <Button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="w-full mt-4"
            >
              {status === "loading" ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Magic Link...
                </div>
              ) : (
                "Send Magic Link"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
