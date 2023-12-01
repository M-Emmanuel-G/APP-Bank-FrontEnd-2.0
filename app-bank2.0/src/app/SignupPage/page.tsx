'use client'

import {FormEvent, useState } from "react";
import Tittle from "../components/Tittle";
import axios from "axios";
import { BASE_URL } from "../URL";
import InputSignup from "../components/inputSignup";
import { useRouter } from "next/navigation";

const SignupPage = ()=> {

    const router = useRouter()

    const [error, setError] = useState('')
    const [nameClient, setNameClient] = useState("")
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const registerClient = (ev:FormEvent<HTMLFormElement>)=>{
        ev.preventDefault()

        const body = {
            nameClient,
            cpf,
            password,
            email,
            phone
        }

        axios
            .post(`${BASE_URL}/clients/signup`, body)
            .then((res)=>{
                localStorage.setItem('idClient', res.data.result.idClient)
                router.push('/AccountPage')
            })
            .catch((err)=>{setError(err.response.data);})
    }


    return (
        <main className="w-screen h-screen flex items-center justify-center text-black">
            <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
                <Tittle tittle="Cadastro"/>
                <section className="w-full h-[90%]">
                    <form onSubmit={registerClient} className="w-full h-full flex flex-col items-center">
                        <h2 className="text-2xl my-8">Insira suas informações!</h2>
                        <InputSignup
                            value={nameClient}
                            onChange={(ev)=>{setNameClient(ev.target.value)}}
                            placeholder="Nome do Cliente"
                            type="text"
                        />
                        <InputSignup
                            value={cpf}
                            onChange={(ev)=>{setCpf(ev.target.value)}}
                            placeholder="CPF"
                            type="text"
                            maxLength={11}
                        />
                        <InputSignup
                            value={email}
                            onChange={(ev)=>{setEmail(ev.target.value)}}
                            placeholder="Email"
                            type="email"
                        />
                        <InputSignup
                            value={phone}
                            onChange={(ev)=>{setPhone(ev.target.value)}}
                            placeholder="text"
                            type="Telefone"
                        />
                        <InputSignup
                            value={password}
                            onChange={(ev)=>{setPassword(ev.target.value)}}
                            placeholder="Senha"
                            type="password"
                            maxLength={6}
                        />
                
                        <span className="my-4 text-red-600">{error}</span>
                        <button className="w-72 h-8 mt-4 bg-sky-500 rounded-xl text-white" > Criar conta</button>
                        <button type="button" className="w-72 h-8 mt-4 bg-sky-500 rounded-xl text-white" onClick={()=>{router.push('/')}}> Voltar</button>
                        
                    </form>
                </section>
            </main>
        </main>
    );
}

export default SignupPage