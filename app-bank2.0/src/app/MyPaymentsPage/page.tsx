'use client'

import Tittle from "../components/Tittle";
import NavBar from "../components/navBar";

export default function MyPayments() {
    return (
        <main className="w-screen h-screen flex items-center justify-center text-black">
            <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
                <Tittle tittle="Meus Pagamentos"/>
                <section className="w-full h-[80%] flex items-center flex-col">

                </section>
                <NavBar/>
            </main>
        </main>
    );
}