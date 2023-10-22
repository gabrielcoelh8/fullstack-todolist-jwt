"use client" 

import { useGenerationStore } from "@/src/contexts/states";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

function Navbar() {
    const [errorValue, setNewErrorValue] = useState<string>('')
    const { isAuth, setIsAuth } = useGenerationStore()
    const router = useRouter()
    
    const logoutUser : FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:4000/auth/sair", {
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
            credentials: "include"
          });
          const data = await response.json();
          
          if(!response.ok) {
            setNewErrorValue(data.message);
          } else {
            setIsAuth(!isAuth)
            router.push('/')
          }
          
        } catch (error) {
          console.log(error);
      }
    }

  return (
    <div className="navbar bg-base-200 pb-1 h-fit">
      <div className="navbar-start">
      </div>
      
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl animate__animated animate__flash">Gestão de prioridades</a>
      </div>

      <div className="navbar-end">
      <div className="dropdown dropdown-end">
      
      <div className="indicator">
        <div className="grid place-items-center">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-20 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2017/08/28/15/41/agro-2690048_1280.jpg" />
                </div>
            </label>
        </div>
        </div>
      
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-focus rounded-box w-52">
            <li>
                <form className="space-y-4" onSubmit={logoutUser}>
                <button className="btn-sm" type="submit">Sair</button>
                </form>
            </li>
      </ul>
    </div>
      </div>
    </div>
  );
}

export default Navbar