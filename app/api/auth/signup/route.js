import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email, password, username } = await request.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken(); // Get the ID token

    // Save user info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      username,
      createdAt: new Date().toISOString(),
    });

    // Set the token in cookies
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      options: {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      },
      // set cookie to expire after 2 days
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });

    return NextResponse.json({ message: "Signup successful", username });
  } catch (error) {
    console.error("Signup error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
