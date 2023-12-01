import { on } from "events";
import Image, { StaticImageData } from "next/image";

export interface propsCard{
    service:string,
    icon:StaticImageData
    onClick: () => void;
}

const CardService:React.FC<propsCard> = ({service, icon, onClick})=> {
    return (
        <div className="w-20 h-20 flex justify-center items-center flex-col" onClick={onClick}>
            <div className="w-20 h-20 m-1 rounded-xl bg-sky-300 flex justify-center items-center flex-col">
                <Image src={icon} alt="" width={50} height={50} />
            </div>
            <span className="text-[8px]">{service}</span>
        </div>
    );
}

export default CardService