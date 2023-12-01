import Modal from "@/app/components/SignOutModal";
import ModalAlert from "@/app/components/modalAlert";
import { useRouter } from "next/navigation";

const jwt = require('jsonwebtoken')

export const verifyToken = ()=>{

    const router = useRouter()

    const token = localStorage.getItem('token')

    const decodedToken = jwt.decode(token);

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if(!token) 
        alert('O token não foi inserido.')

    if (decodedToken.exp < currentTimestamp){
        alert('Sua sessào expirou... Por favor, realize o login novamente.')
        router.push('/')
    }  
        
}
