'use client'

import Image from "next/image";
import { BASE_URL } from "../URL";
import useRequestData from "../hooks/useRequestData";
import ImgDep from '../images/deposit.png'
import ImgTransfer from '../images/transfer.png'
import ImgPayment from '../images/payment.png'
import ImgMyPayment from '../images/myPayments.png'
import Img$ from '../images/cifrao.png'
import NavBar from "../components/navBar";
import CardService from "../components/cardService";
import { useRouter } from "next/navigation";
import { verifyToken } from "../hooks/VerifyToken";
import AnimPulse from "../components/AnimPulse";

export default function Home() {

    interface CodAccount{
        cod_account: string
    }

    verifyToken()

    const router = useRouter()

    const headers = {
        headers:{authorization: localStorage.getItem('token')}
    }

    const [profile] = useRequestData(`${BASE_URL}/clients/getProfile`, headers)
    const [ dataClient] = useRequestData(`${BASE_URL}/accounts/myAccountClient/${profile.id_user}`, headers)
   
   const getCodAccount = dataClient.map((client:CodAccount)=>{ return client.cod_account });
    
   const getBalance = dataClient && dataClient.map((client:any, key:string)=>{
       return(
           <span key={key} id='Balance'>R$ {Number(client.balance).toFixed(2)}</span>
       )
   })

    const [historic, isLoading ] = useRequestData(`${BASE_URL}/transactions/gethistoric/${getCodAccount}`, headers)
 
    const renderHistoric = historic && historic.map((historic:any)=>{
        
        return(
            <div className="w-full h-4 my-1 flex justify-between items-center ">
                <p className="mx-4">{historic.transaction_name}</p>
                <p className="mx-4">R$ {historic.transaction_Value.toFixed(2)}</p>
            </div>
        )
    })

   
    return (
        <main className="w-screen h-screen flex items-center justify-center text-black">
            <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
                <div className="w-full h-[30%] bg-sky-400 flex rounded-b-xl items-center">
                   <div className="w-1/2 h-full flex items-center relative bottom-8 left-5">
                        <Image src={Img$} alt="" className="relative" width={100} height={100}/>
                   </div>
                   <div className=" w-1/2 h-full flex flex-col">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">Bem vindo,</span>
                            <span className="text-xl">{profile.name_client}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Saldo Atual:</span>
                            <span className="text-3xl">{getBalance}</span>
                        </div>
                    </div>                    
                </div>
                <section className="w-full h-[30%] flex  flex-wrap justify-center gap-1">
                    <CardService
                        service='Depósitos'
                        icon = {ImgDep}
                        onClick={()=>{router.push('/DepositPage')}}
                    />
                    <CardService
                        icon={ImgTransfer}
                        service="Transferencia"
                        onClick={()=>{router.push('/TransferPage')}}
                    />
                    <CardService
                        icon={ImgPayment}
                        service="Pagamentos"
                        onClick={()=>{router.push('/PaymentPage')}}
                    />
                    <CardService
                        icon={ImgMyPayment}
                        service="Meus Pagamentos"
                        onClick={()=>{router.push('/MyPaymentsPage')}}
                    />
                </section>
                <section className="w-full h-[40%] flex flex-col items-center">
                    <h2>Ultimas transacoes</h2>
                    {isLoading && <AnimPulse/>}
                    {!isLoading && renderHistoric}
                </section>
                <NavBar/>
            </main>
        </main>
 );
}