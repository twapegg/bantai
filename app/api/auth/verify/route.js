import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || !token.value) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 200 }
      );
    }

    // Basic token validation - check if it exists and has proper structure
    // In a production app, you'd verify with Firebase Admin SDK
    if (token.value.length > 50) {
      // Basic JWT length check
      return NextResponse.json(
        {
          authenticated: true,
          user: { hasValidToken: true },
        },
        { status: 200 }
      );
    } else {
      // Clear invalid token
      cookieStore.delete("token");
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
  }
};
