/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

type AsyncRequestHandler = (req: Request) => Promise<NextResponse>;

/**
 * Higher-order function that wraps an async request handler to catch and handle errors
 * @param handler - Async function that processes the request
 * @returns Wrapped handler that catches errors and returns appropriate responses
 */
export const catchAsyncErrors = (
  handler: AsyncRequestHandler
): ((req: Request) => Promise<NextResponse>) => {
  return async (req: Request): Promise<NextResponse> => {
    try {
      const response = await handler(req);
      return response;
    } catch (error) {
      console.error("Request handler error:", error);
      
      // Return error response with appropriate status
      return NextResponse.json(
        { 
          error: "Internal Server Error",
          message: error instanceof Error ? error.message : "An unexpected error occurred"
        },
        { status: 500 }
      );
    }
  };
};
