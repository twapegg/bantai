// import { NextResponse } from "next/server";
// import {signInWithEmailAndPassword} from "firebase/auth";
// import { auth, db } from "@/lib/firebase"; // Adjust the import based on your Firebase setup
// import { doc, getDoc } from "firebase/firestore";

// // POST /api/auth/login
// export async function POST(request) {
//   const { email, password } = await request.json();
//   try {
//     // Firebase Auth login
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Get user role from Firestore
//     const userDoc = await getDoc(doc(db, "users", user.uid));
//     if (!userDoc.exists()) {
//       return NextResponse.json({ error: "User profile not found" }, { status: 404 });
//     }

//     const userData = userDoc.data();

//     return NextResponse.json({
//       email: userData.email,
//       message: "Login successful",
//     }); 

//     } catch (error) {
//       console.error("Login error:", error.message);
//       return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 });
//     }
// }