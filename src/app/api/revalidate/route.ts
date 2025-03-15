import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    revalidatePath("/", "layout");

    // Return a success response
    return NextResponse.json({
      success: true,
      message: `Path '/' revalidated successfully`,
      revalidated: true,
      now: Date.now()
    });
  } catch (error) {
    // Return an error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error revalidating path',
        error: (error as Error).message 
      },
      { status: 500 }
    );
  }
}
