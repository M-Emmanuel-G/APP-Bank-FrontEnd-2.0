'use client'

import axios from "axios";
import { BASE_URL } from "../URL";
import Tittle from "../components/Tittle";
import NavBar from "../components/navBar";
import useRequestData from "../hooks/useRequestData";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function TransferPage() {

    const router = useRouter()

    const [ value, setValue ] = useState('')
    const [ account, setAccount ] = useState('')
    const [ error, setError ] = useState('')

    const [ profile ] = useRequestData(`${BASE_URL}/clients/getProfile`, {headers:{ authorization: localStorage.getItem('token')}})
    const [dataClient] = useRequestData(`${BASE_URL}/accounts/myAccountClient/${profile.id_user}`, {headers:{ authorization: localStorage.getItem('token')}})
    const [dataClientTransfer, isLoading] = useRequestData(`${BASE_URL}/accounts/accountClient/${account}`, {headers:{ authorization: localStorage.getItem('token')}})
    
    const getBalance = dataClient.map((client:any)=>{ return client.balance.toFixed(2)})
 
    const transfer = ()=>{

        const body = {
            newBalance: Number(value),
            codTransfer: account
        }
        
        axios
            .post(`${BASE_URL}/accounts/transfer/${dataClient[0].cod_account}`, body)
            .then((res)=>{
                router.push('/Process')
            })
            .catch((err)=>{setError(err.response.data)})
        
    }

    const renderClientTransfer = dataClientTransfer.map((client:any)=>{
       return(
        <>
            <div>
                <strong>Cliente:</strong>
                <span>{client.name_client}</span>
            </div>
            <div>
                <strong>CPF:</strong>
                <span>{client.cpf}</span>
            </div>
            
        </>
       )
    })

    const clientExist = ()=>{
        if(renderClientTransfer.length === 0){
            return 'Conta não localizada.'
        } else {
            return renderClientTransfer
        }
    }

 return (
    <main className="w-screen h-screen flex items-center justify-center text-black">
        <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
            <Tittle
                tittle="Transferências"
            />
            <section className="w-full h-[80%] flex flex-col">
                <div className="w-full flex justify-center">
                    <strong>Saldo Atual: R$ {getBalance}</strong>
                </div>
                <div className="w-full flex justify-center">
                    <strong>Insira os dados abaixo do destinatário</strong>
                </div>
                <section className=" w-full bg-slate-100">
                    <div>
                        <strong>Numero da conta: </strong>
                        <input
                            className="w-20 h-8 bg-transparent outline-none text-center border-b-2 border-sky-400"
                            type="text"
                            value={account}
                            onChange={(ev)=>{setAccount(ev.target.value)}}
                        />
                    </div>
                    <div>
                        <strong>Valor da transferência:</strong>
                        <input
                            className="w-20 h-8 bg-transparent outline-none text-center border-b-2 border-sky-400"
                            type="text"
                            value={value}
                            onChange={(ev)=>{setValue(ev.target.value)}}
                        />
                    </div>
                </section>
                <div className="w-full h-64 flex flex-col items-center my-8">
                    <strong className="text-bold text-2xl">Informações do destinatário</strong>
                        {clientExist()}
                </div>
                <div className="w-full h-8 flex justify-center items-center">
                    <span className="text-sm">{error}</span>
                </div>
                <div className="w-full h-20 flex justify-center items-center flex-col">
                    {/* <span className="text-sm text-center">Antes de confirmar, confira todos os dados do destinatário.</span> */}
                    <button onClick={transfer} className="w-80 h-8 bg-sky-400 rounded-xl">Realizar transferência</button>
                </div>
            </section>
            <NavBar/>
        </main>
    </main>
 );
}