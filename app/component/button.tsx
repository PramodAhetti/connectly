import React from 'react'
export default function LoginButton({title}:{title:string}){
  return (
    <button className="bg-blue-500 w-1/3 text-center text-white py-3 px-8 rounded-md font-semibold border border-white hover:bg-gray-800 transition duration-300">
    {title} 
  </button>
  )
}