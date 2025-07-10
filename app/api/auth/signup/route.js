import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export async function POST(request) {
  const { email, password, username } = await request.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user info to Firestore
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
      username,
      createdAt: new Date().toISOString()   
    });

    return NextResponse.json({ message: "Signup successful", username });
  } catch (error) {
    console.error("Signup error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
