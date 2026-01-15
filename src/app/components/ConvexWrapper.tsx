"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

interface ConvexWrapperProps {
  children: ReactNode;
}

export function ConvexWrapper({ children }: ConvexWrapperProps) {
  // Check if Convex is configured
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  
  if (!convexUrl) {
    console.warn("NEXT_PUBLIC_CONVEX_URL not found. Convex features will be disabled.");
    return <>{children}</>;
  }
  
  const convex = new ConvexReactClient(convexUrl);
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}