'use client'

import AnimLoadingPing from "../components/AnimLoading";

const DeleteAccountPage = () => {
 return (
    <main className="w-screen h-screen flex items-center justify-center text-black">
        <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
            <AnimLoadingPing
                text01="Aguarde..Sua conta esta sendo excluida."
                text02="Sua conta foi excluida com sucesso...Obrigado por contar com nossos serviços."
                navigation='/'
            />
        </main>
    </main>
 );
}

export default DeleteAccountPage