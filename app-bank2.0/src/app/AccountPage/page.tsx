'use client'

import axios from "axios";
import { BASE_URL } from "../URL";
import Tittle from "../components/Tittle";
import useRequestData from "../hooks/useRequestData";
import ButtonGeneric from "../components/ButtonGeneric";
import { useRouter } from "next/navigation";

const AccountPage = () => {

  const router = useRouter()

  interface Account{
    name_client:string
    cpf:string
    phone:string
    email:string
  }
 
  const [client] = useRequestData(`${BASE_URL}/clients/getUser/${localStorage.getItem('idClient')}`, {headers:{ authorization: localStorage.getItem('token')}});

    const createAccount = ()=>{
        axios
            .post(`${BASE_URL}/accounts/create/${localStorage.getItem('idClient')}`)
                .then((res)=>{
                  router.push('/FinishAccountPage')
                })
                .catch((err)=>{console.log(err.response.data)})
    }

    const renderClient = client.map((client:Account, key:string)=>{
        return(
            <section className="w-full h-[90%] flex flex-col items-center justify-center"  key={key}>
              <div>
                <h2 className="text-2xl">Confirme os seus dados!</h2>
              </div>
                <div className="my-4">
                    <strong>Nome Completo: </strong>
                    <span>{client.name_client}</span>
                </div>
                <div className="my-4">
                    <strong>CPF: </strong>
                    <span>{client.cpf}</span>
                </div>
                <div className="my-4">
                    <strong>Telefone: </strong>
                    <span>{client.phone}</span>
                </div>
                <div className="my-4">
                    <strong>Email: </strong>
                    <span>{client.email}</span>
                </div>
                <div className="my-4">
                  <ButtonGeneric
                    nameButton="Criar Conta"
                    onClick={createAccount}
                  />
                </div>
            </section>
        )
    })
 
  return (
    <main className="w-screen h-screen flex items-center justify-center text-black">
      <main className=" w-[376px] h-[667px] bg-gradient-to-b from-sky-400 to-white flex flex-col items-center">
        <Tittle
          tittle="Dados da conta"
        />
        <section className="w-full h-[90%] flex justify-center items-center flex-col">
          {renderClient}
        </section>
      </main>
  </main>
 );
}

export default AccountPage