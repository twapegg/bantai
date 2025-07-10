"use client";
// This is a client component because it uses useState for password visibility toggle
import React,{useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';
import NavBar from '@/components/navbar';
import Link from 'next/link';

export default function Login() {
  const[passwordVisible,setPasswordVisible] = useState(false);
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password.");
    }
  }


  return(
  <div className="min-h-screen">
    <NavBar />
      <div className="flex items-center justify-center bg-[#F8FAFD]">
        <div className="flex h-120 w-250 border border-black/10 rounded-lg shadow-lg overflow-hidden">
          <div className='flex flex-col flex-1 bg-white items-center justify-center p-6'>

          {/*Header of the login */}
          <h5 className='text-2xl font-bold mb-3 text-[#03585F]'>bant.<span className='text-[#EE9471]'>ai</span></h5>
          <h2 className='text-3xl font-bold'> Welcome Back!</h2>
          <p className='text-2 text-[#616161]'>Login to your account</p>

          {/*This is the initial form of the login — left side of the card*/}
          <form onSubmit={handleLogin} className='mt-6 w-7/12'>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='block w-full font-semibold bg-[#D9E5D9] mb-2 px-4 py-3 text-sm rounded-xl placeholder:text-gray'/>
              
              {/* Password input with visibility toggle */}
              <div className="w-full font-semibold flex items-center bg-[#D9E5D9] rounded-xl px-4 py-3 mb-4">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? "text" : "password"} placeholder='Password' className='flex-1 bg-transparent text-sm placeholder:text-gray focus:outline-none'/>
                <button onClick={() => setPasswordVisible(!passwordVisible)} type="button" className="focus:outline-none">
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 text-teal-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    ):(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 text-teal-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>  
                    )}
                </button>
              </div>          

              {/*Login Button for form submission*/}
              <button type="submit" className='w-full bg-linear-to-b rounded-full py-2 from-[#f1c3b1] to-[#eea571] cursor-pointer'>Login</button>
            </form>
          </div>

          {/*Right side of the card*/}
          <div className='flex flex-col flex-1 items-center justify-center text-white p-6' 
              style={{ backgroundImage: 'linear-gradient(to right, #538D84 5%, #41817C 30%, #044c5a 100%)'}}>
              <h2 className="text-3xl font-bold mb-2">No account yet?</h2>
              <p className="mb-4 text-sm">It's free and it only takes a minute.</p>
              <Link className="border-2 w-50 font-bold text-center border-white rounded-full px-6 py-2 hover:bg-white hover:text-teal-700 transition cursor-pointer" 
                 href='/auth/signup'>Sign-in</Link>
          </div>
        </div>
      </div>
  </div>
  );
}