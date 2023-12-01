'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Tittle from "../components/Tittle";
import ImgSuccess from '../images/success.png'
import Image from "next/image";

export default function ProcessPage() {

    const router = useRouter()    
   
    useEffect(() => {
        setTimeout(() => {
            const anim:HTMLElement | null = document.getElementById('AnimPing')
            if(anim) anim.style.display='none' 
            const animSuccess:HTMLElement | null = document.getElementById('Success')
            if(animSuccess) animSuccess.style.display='flex' 
        }, 4000)
        setTimeout(() => {
            router.push('/Home')
        }, 7000)
    },
        
        
        []);

 
    
    return (
         <main className="w-screen h-screen flex items-center justify-center text-black">
            <main className=" w-[376px] h-[667px] from-sky-400 to-white flex flex-col items-center justify-center">
                <Tittle tittle="Processando..."/>
            <div className="w-full h-full flex justify-center items-center flex-col" id="AnimPing" >
                <div className="rounded-full bg-sky-400 h-12 w-12 animate-ping my-10"/>
                <h2>Aguarde... Transação em andamento...</h2>
            </div>
            <div id="Success" className="w-full h-full justify-center items-center flex-col hidden">
                <Image src={ImgSuccess} alt="" width={100} height={100}/>
                <h2>Transação realizada com sucesso...</h2>
            </div>
            </main>
        </main>
 );
}