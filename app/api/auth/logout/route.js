import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async () => {
  try {
    const cookieStore = await cookies();

    // Clear the authentication token cookie
    cookieStore.delete("token");

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
};
