"use client";

import { useGetCurrentUser, useLogout } from "@/api-query";
import { useState } from "react";
import LoginModal from "./login-modal";

export default function AuthStatus() {
  const { data, isLoading, refetch } = useGetCurrentUser({});
  const { mutateAsync: logout } = useLogout();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const user = data?.user ?? null;

  const handleLogout = async () => {
    try {
      // Use the generic POST auth mutation; server may treat empty POST as logout
      await logout({});
      await refetch();
    } catch {
      // ignore errors for now
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">
              Welcome, {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          // Refresh user data after potential login
          refetch();
        }}
      />
    </>
  );
}
