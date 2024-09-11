
import logo from "../assets/logo-inorbit.svg";
import ilustration from "../assets/lets-start.svg";
import {Plus} from 'lucide-react'
import { Button } from "../components/ui/button";
import { DialogTrigger } from "./ui/dialog";

export default function EmptyGoals(){
    return(
        <div className="h-screen flex justify-center flex-col items-center gap-8">
                <img src={logo} alt="in.orbit logo" />
                <img src={ilustration} alt="Lets start illustration" />
                <p className="text-zinc-300 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>
            
               <DialogTrigger asChild>
                    <Button type="button">
                        <Plus className="size-4"/>
                        Cadastrar meta
                    </Button>
               </DialogTrigger>
            </div>
    )
}