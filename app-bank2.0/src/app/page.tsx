'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { BASE_URL } from "./URL";

export default function Home() {

  const router = useRouter();
  const [info, setInfo] = useState('')
  const [cpf, setCpf] = useState('')
  const [pass, setPass] = useState('')

  
  const login = (ev: FormEvent<HTMLFormElement>)=>{
    ev.preventDefault()

    const body = {
      cpf,
      password:pass
    }

    axios
      .post(`${BASE_URL}/clients/login`, body)
      .then((res)=>{
        localStorage.setItem('token', res.data.token)
        router.push('/Home')
      })
      .catch((err)=>{setInfo(err.response.data);
      })
  }

  return (
    <main className='bg-black w-screen h-screen flex items-center justify-center'>
      <section className=" w-[376px] h-[667px] flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-white">
        <div>
          <h2 className="text-4xl text-swhite">AppBank</h2>
        </div>
        <div>
          <form className="flex flex-col" onSubmit={login}>
            <input 
              className="w-72 h-8 mt-4 text-black border-none outline-none text-center bg-transparent border-b-2 border-sky-400 placeholder:text-black"
              placeholder="CPF"
              value={cpf}
              onChange={(ev)=>{setCpf(ev.target.value)}}
              type="text"
              maxLength={11}
            />
            <input 
              className="w-72 h-8 mt-4 text-black border-none outline-none text-center bg-transparent border-b-2 border-sky-400 placeholder:text-black"
              placeholder="SENHA"
              value={pass}
              onChange={(ev)=>{setPass(ev.target.value)}}
              type="password"
              maxLength={6}
            />
            <div className="">
              <span className="text-red-400 text-center w-full h-8 flex justify-center items-center text-xs">{info}</span>
            </div>
            <button className="w-72 h-8 mt-4 bg-sky-500 rounded-xl">Entrar</button>
          </form>
          <button onClick={()=>{router.push('/SignupPage')}} className="w-72 h-8 mt-4 bg-sky-500 rounded-xl">Registrar</button>
        </div>

      </section>
    </main>
  )
}
