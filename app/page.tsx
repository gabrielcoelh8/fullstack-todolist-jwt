"use client" 

import { useGenerationStore } from "@/src/contexts/states";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [userNameValue, setNewUserNameValue] = useState<string>('')
  const [passwordValue, setNewPasswordValue] = useState<string>('')
  const [errorValue, setNewErrorValue] = useState<string>('')
  const { isAuth, setIsAuth } = useGenerationStore()

  const loginUser : FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch("http://localhost:4000/auth/entrar", {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            user_name: userNameValue,
            password: passwordValue,
          })
        });
        const data = await response.json();
        
        if(!response.ok) {
          setNewErrorValue(data.message);
        } else {
          router.push('/dashboard')
          setIsAuth(!isAuth)
        }
        
      } catch (error) {
        console.log(error);
    }
  }

  const handleAcceptClick = () => {
    // Limpe o erro definindo o estado para uma string vazia
    setNewErrorValue('');
  };

  return (
    <main className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-purple-700 p-2">Gestão de prioridades</h1>

            <form className="space-y-4" onSubmit={loginUser}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Usuário</span>
                    </label>

                    <input 
                    type="text" 
                    value={userNameValue} 
                    placeholder="Insira o nome de usuário" 
                    className="w-full input input-bordered input-primary" 
                    onChange={(e) => {
                      setNewUserNameValue(e.target.value);
                    }}
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Senha</span>
                    </label>

                    <input 
                    type="password" 
                    value={passwordValue}
                    placeholder="Insira a senha" 
                    className="w-full input input-bordered input-primary" 
                    onChange={(e) => {
                      setNewPasswordValue(e.target.value);
                    }}
                    />
                </div>
                
                <div>
                    <button className="btn btn-primary">Login</button>
                </div>

            </form>
        </div>


        {errorValue && (
        <div className="alert w-fit m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorValue}</span>
          <div>
            <button className="btn btn-sm btn-primary" onClick={handleAcceptClick}>OK</button>
          </div>
        </div>
      )}
    </main>
  )
}
