"use client"
import React from 'react'
import { useSession,signIn,signOut } from 'next-auth/react'
export default function LoginButton() {
  return (
    <button onClick={()=>{signIn()}} className="bg-black text-white py-3 px-8 rounded-full font-semibold border border-white hover:bg-gray-800 transition duration-300">
    Get Started 
  </button>
  )
}