"use client"

import type React from "react"

import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./contexts/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

