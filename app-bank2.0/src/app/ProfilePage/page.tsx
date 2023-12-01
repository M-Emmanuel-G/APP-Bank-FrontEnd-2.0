'use client'

import axios from "axios";
import { BASE_URL } from "../URL";
import ButtonGeneric from "../components/ButtonGeneric";
import Tittle from "../components/Tittle";
import NavBar from "../components/navBar";
import useRequestData from "../hooks/useRequestData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "../components/DeleteModal";

export default function ProfilePage() {

    interface CodAccount{
        cod_account: string
    }

    interface Profile{
        img:string
        name_client : string
        email : string
        phone : string
        cpf : string
        cod_account : string
        type_account : string
    }
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [info, setInfo] = useState('')


    const [ profile, isLoading ] = useRequestData(`${BASE_URL}/clients/getProfile`, {headers:{ authorization: localStorage.getItem('token')}})
    const [dataClient] = useRequestData(`${BASE_URL}/accounts/myAccountClient/${profile.id_user}`, {headers:{ authorization: localStorage.getItem('token')}})
    const getCodAccount = dataClient.map((client:CodAccount)=>{ return client.cod_account });
    const router = useRouter()

    const deleteAccount = ()=>{

        const body = {
            cpf,
            password
        }

        axios
            .post(`${BASE_URL}/accounts/delete/${getCodAccount}`, body)
            .then((res)=>{ 
                router.push('/DeleteAccountPage')
                localStorage.clear()
                
            })
            .catch((err)=>{
                setInfo(err.response.data)
            })
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getProfile = dataClient.map((profile:Profile, key:string)=>{
        return(
            <section key={key}>
                <div className="my-4">
                    <img src={profile.img}/>
                </div>
                 <div className="my-4">
                    <strong>Nome completo:</strong>
                    <span> {profile.name_client}</span>
                </div>
                <div className="my-4">
                    <strong>Email:</strong>
                    <span> {profile.email}</span>
                </div>
                <div className="my-4">
                    <strong>Telefone:</strong>
                    <span> {profile.phone}</span>
                </div>
                <div className="my-4">
                    <strong>CPF:</strong>
                    <span> {profile.cpf}</span>
                </div>
                <div className="my-4">
                    <strong>Conta:</strong>
                    <span> {profile.cod_account}</span>
                </div>
                <div className="my-4">
                    <strong>Tipo da conta:</strong>
                    <span> {profile.type_account}</span>
                </div>
                <div>
                    <ButtonGeneric
                        nameButton="Excluir Conta"
                        onClick={openModal}
                    />
                </div>
            </section>
        )
    })

    return (
        <main className="w-screen h-screen flex items-center justify-center text-black">
            <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
                <Tittle tittle="Meus Perfil"/>
                <section className="w-full h-[80%] flex items-center justify-center flex-col">
                    {isLoading && "Carregando..."}
                    {!isLoading && getProfile}
                </section>
                <NavBar/>
                <DeleteModal isOpen={isModalOpen} onClose={()=>{}}>
                <form className="w-full h-full flex flex-col items-center justify-center">
                    <div className="my-4">
                        <strong>Confirme seus dados antes de proseguir!</strong>
                        <h2 className="text-sm">Esta ação não podera ser revertida.</h2>
                    </div>
                    <div>
                        <input
                            className=" w-full h-8 border-b-2 border-sky-400 bg-white my-2 outline-none "
                            value={cpf}
                            onChange={(ev)=>{setCpf(ev.target.value)}}
                            placeholder="Digite seu CPF..."
                            maxLength={11}
                        />
                    </div>
                    <div>
                        <input
                            className=" w-[90%] h-8 border-b-2 border-sky-400 bg-white my-2 outline-none "
                            value={password}
                            onChange={(ev)=>{setPassword(ev.target.value)}}
                            placeholder="Digite sua Senha..."
                            maxLength={6}
                        />

                    </div>
                    <div className="w-full h-8 text-center">
                        <span className="text-sm text-red-600">{info}</span>
                    </div>
                    <div className="flex flex-col">
                        <ButtonGeneric
                            nameButton="Exluir Conta"
                            onClick={deleteAccount}
                            type="button"
                            disabled={cpf.length !==11 || password.length !== 6}
                        />
                        <ButtonGeneric
                            nameButton="Voltar"
                            onClick={closeModal}
                        />
                    </div>
                </form>
            </DeleteModal>
            </main>
        </main>
    );
}