"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // Only render ConvexProvider if we have a valid URL
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    console.warn("NEXT_PUBLIC_CONVEX_URL not found. Convex features will be disabled.");
    return <>{children}</>;
  }
  
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const convex = new ConvexReactClient(convexUrl);
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}