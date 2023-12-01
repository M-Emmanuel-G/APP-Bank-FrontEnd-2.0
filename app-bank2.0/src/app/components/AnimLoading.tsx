import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import ImgSuccess from '../images/success.png'

interface AnimProps{
   text01: string
   text02: string
   navigation: string
}

const AnimLoadingPing:FC<AnimProps> = ({ text01,  text02, navigation}) => {

   const router = useRouter()

   useEffect(() => {
      setTimeout(() => {
          const anim:HTMLElement | null = document.getElementById('screen01')
          if(anim) anim.style.display='none' 
          const animSuccess:HTMLElement | null = document.getElementById('screen02')
          if(animSuccess) animSuccess.style.display='flex' 
      }, 4000)
      setTimeout(() => {
          router.push(navigation)
      }, 7000)
  },
      
      
      []);

 return (
   <main className="w-full h-full flex justify-center items-center text-center bg-gradient-to-b from-sky-400 to-white">
      <div className=" w-full h-full flex justify-center items-center flex-col " id="screen01">
         <h2>{text01}</h2>
         <div className="rounded-full bg-sky-400 h-12 w-12 animate-ping my-10"/>
      </div>
      <div className="w-full h-full justify-center items-center flex-col hidden" id="screen02">
         <Image src={ImgSuccess} alt="" width={100} height={100}/>
         <h2>{text02}</h2>
      </div>
   </main>
 );
}

export default AnimLoadingPing