'use client'

import { FormEvent, useState } from "react";
import Tittle from "../components/Tittle";
import NavBar from "../components/navBar";
import useRequestData from "../hooks/useRequestData";
import { BASE_URL } from "../URL";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PaymentPage() {

    interface Account {
        cod_account: number;
      }

    interface Billet {
        cod_bars_billet:string
        value_billet : number
        description_billets : string
      }

    const router = useRouter()

    const [ profile ] = useRequestData(`${BASE_URL}/clients/getProfile`, {headers:{ authorization: localStorage.getItem('token')}})
    
    const [dataClient] = useRequestData(`${BASE_URL}/accounts/myAccountClient/${profile.id_user}`, {headers:{ authorization: localStorage.getItem('token')}})

    const getCodAccount:string[] = dataClient.map((account:Account)=>{ return account.cod_account})

    const [codBars, setCodBars] = useState('')
    const [info, setInfo] = useState('')
    const [renderBillet, setRenderBillet] = useState([])

    const getBillet = (ev:FormEvent<HTMLFormElement>)=>{
        ev.preventDefault();

        const body = {
            codBars
        }

        axios
            .post(`${BASE_URL}/billets/getBillet`, body)
            .then((res)=>{setRenderBillet(res.data)})
            .catch((err)=>{(err.response.data)})
    }

    const makePayment = (codBars:string)=>{
        const body = {
            codBars
        }

        axios
            .post(`${BASE_URL}/payments/makePayment/${getCodAccount}`, body)
            .then((res)=>{
                router.push('/Process')
            })
            .catch((err)=>{
                setInfo(err.response.data)
            })
    }

    const billet = renderBillet.map((billet :Billet,key)=>{
        return(
            <section className="w-full h-full flex flex-col items-center relative" key={key}>
                <div className=" my-2">
                    <strong>Codigo de barras:</strong>
                    <span>{billet.cod_bars_billet}</span>
                </div>
                <div className=" my-2">
                    <strong>Valor Boleto:</strong>
                    <span> R$ {Number(billet.value_billet).toFixed(2)}</span>
                </div>
                <div className=" my-2">
                    <strong>descrição do boleto:</strong>
                    <span>{billet.description_billets}</span>
                </div>
                <div className="text-center">
                    <span className="text-red-600 text-sm">{info}</span>
                </div>
                <div className="absolute bottom-4 w-72 h-8 bg-sky-400 rounded-xl flex flex-col justify-center items-center my-2">
                    <button onClick={()=>{makePayment(billet.cod_bars_billet)}}>Pagar conta</button>
                </div>
            </section>
        )
    })


 return (
    <main className="w-screen h-screen flex items-center justify-center text-black">
        <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
            <Tittle tittle=" Pagamentos"/>
            <section className="w-full h-[80%] flex  flex-wrap justify-center gap-1">
                <form onSubmit ={getBillet} className="w-full h-[20%] flex flex-col justify-center items-center">
                    <strong>Insira o Codigo de barras:</strong>
                    <input
                        value={codBars}
                        onChange={(ev)=>{setCodBars(ev.target.value)}}
                        className="w-72 h-8 bg-transparent border-b-2 border-sky-400 text-center text-black outline-none my-4"
                        placeholder="Numero do boleto..."
                    />
                    <button>Consultar</button>
                </form>
                <div className="w-full h-[80%]">
                    {billet}
                </div>
            </section>
            <NavBar/>
        </main>
    </main>
 );
}