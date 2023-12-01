'use client'

import { FormEvent, useState } from "react";
import Tittle from "../components/Tittle";
import NavBar from "../components/navBar";
import useRequestData from "../hooks/useRequestData";
import { BASE_URL } from "../URL";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DepositPage() {

    const [value, setValue] = useState('')
    const [info, setInfo] = useState('')
    const router = useRouter()

    const headers = {
        headers:{ authorization: localStorage.getItem('token')}
    }

    const [ profile ] = useRequestData(`${BASE_URL}/clients/getProfile`, headers )
    const [dataClient] = useRequestData(`${BASE_URL}/accounts/myAccountClient/${profile.id_user}`, headers )
    const getCodAccount = dataClient.map((client:any)=>{ return client.cod_account})
    
    const sendDeposit = (ev: FormEvent<HTMLFormElement>)=>{
        ev.preventDefault()

        const body = {
            deposit: Number(value)
        }
        axios
            .post(`${BASE_URL}/accounts/deposit/${getCodAccount}`, body)
            .then((res=>{ 
                router.push('/Process')
             }))
            .catch((err)=>{ setInfo(err.response.data)})
        }

 return (
    <main className="w-screen h-screen flex items-center justify-center text-black">
        <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
            <Tittle
                tittle="Depositos"
            />
            <section className="w-full h-[80%] flex flex-col">
                <form className="w-full h-full flex flex-col items-center" onSubmit={sendDeposit}>
                    <div className=" w-full h-16 flex justify-center items-center mt-10">
                        <label>Valor a depositar:</label>
                        <input
                            value={value}
                            onChange={(ev)=>{Number(setValue(ev.target.value))}}
                            className="w-20 h-8 bg-transparent border-b-4 text-center border-sky-400 outline-none"
                        />
                    </div>
                    <div className=" w-full h-[5%] text-center flex justify-center items-center">
                        <span className="text-red-400">{info}</span>
                    </div>
                    <button>Realizar Deposito</button>
                </form>
            </section>
            <NavBar/>
        </main>
    </main>
 );
}