import Link from 'next/link';
import ImgProfile from '../images/profile.png'
import ImgSignout from '../images/exit.png'
import ImgHome from '../images/homepage.png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Modal from './SignOutModal';
import { useState } from 'react';

const NavBar = ()=> {

  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const signout = ()=>{
    router.push('/')
    localStorage.clear()
  }
    
    return (
        <main className=' w-full h-[10%] flex justify-around items-center bg-blue-400'>
            <Image src={ImgHome} alt='' width={50} height={50} onClick={()=>{router.push('/Home')}}/>
            <Image src={ImgProfile} alt='' width={50} height={50} onClick={()=>{router.push('/ProfilePage')}} />
            <Image src={ImgSignout} alt='' width={50} height={50} onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold mb-4">Deseja encerrar a sessão?</h2>
            <div>
                <button className='w-40 h-8 rounded-xl bg-sky-400 mx-1' onClick={closeModal}>Voltar</button>
                <button className='w-40 h-8 rounded-xl bg-red-400 mx-1' onClick={signout}>Encerrar</button>
            </div>
            </Modal>
        </main>
    );
}

export default NavBar