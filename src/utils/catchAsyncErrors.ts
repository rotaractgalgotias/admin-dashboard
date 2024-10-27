/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

type AsyncFn = (req: Request) => Promise<any>;

export const catchAsyncErrors = (fn: AsyncFn) => (req: Request) => {
  try {
    fn(req).catch((err) => {
      console.error("Async error:", err);
      NextResponse.next(err); // Passes asynchronous errors to the error handler
    });
  } catch (err) {
    console.error("Synchronous error:", err);
    NextResponse.next(err as any); // Passes synchronous errors to the error handler
  }
};
