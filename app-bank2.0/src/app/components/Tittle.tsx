import React from "react";

export interface TittleProps{
    tittle: string
}

const Tittle:React.FC<TittleProps> = ({tittle}) => {
    return (
        <header className=" w-full h-[10%] flex items-center justify-center bg-sky-400">
            <h2 className="text-bold text-3xl">{tittle}</h2>
        </header>
    );
}

export default Tittle