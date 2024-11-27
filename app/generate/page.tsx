'use client'
import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { useState, useRef } from "react";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { stringify } from "querystring";
import local from "next/font/local";
import { Avatar } from "@mui/material";
export default function generate() {
    const session = useSession();
    const [data, setdata] = useState<string>('connectly');
    const curData = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const userData = localStorage.getItem('userData');

        if (userData) {
            console.log(userData);
            setdata(userData);
        }
    }, []);
    function updateData() {
        if (session.data?.user?.name) {
            let userData: string = session.data.user.name
            userData += `#${curData.current?.value}`;
            setdata(userData);
            console.log(userData);
            localStorage.setItem('userData', userData)
        } else {
            redirect('/')
        }
    }
    return (
        <div className="flex flex-col items-center">
                 <nav className="flex flex-row items-center w-full justify-between px-4 py-2 m-2">
        <QrCode onClick={()=>{redirect('/')}} height={40} width={40} />
      <Avatar alt="Remy Sharp" sx={{width:50,height:50}} src={(session.data?.user?.image)|| "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"} />

      </nav>
 
            <div className="m-10"></div>
            <h1 className="text-3xl">Share Number</h1>
           <p className="text-1xl px-10 m-4">Scan this QR code to recieve contact details of "{session.data?.user?.name}"</p> 
           <div className="m-10"></div>
            <QRCodeSVG size={300} level="M" bgColor="white" className='border border-white' value={data} />

            <div className="m-10"></div>
            {(localStorage.getItem('userData')) ? (<></>) : (<div className="flex">
                <input ref={curData} className="text-black p-1 m-1" placeholder="Phone No"></input>
                <button className="bg-blue-500 m-1 text-center text-white p-1 rounded-md font-semibold border border-white hover:bg-gray-800 transition duration-300" onClick={updateData}>Generate</button>
            </div>)}
            {(data!='connectly')?(<div>QR-Data : {data}</div>):(<></>)}

        </div>
    );
};

