import React from "react"



export default function app(){
    return (
        <div className="flex bg-zinc-800 text-white px-8 py-2 items-center justify-between " >
            <div className="flex item-center">
                <img 
                className="h-10 me-4"
                src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" 
                alt="logo"/>
                <h1 className="text-2xl font-semibold">BookHaven</h1>
            </div>
            <div>Link </div>
        </div>
    )
}