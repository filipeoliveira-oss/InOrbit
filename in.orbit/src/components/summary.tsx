import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import InOrbitIcon from "../assets/inOrbitIcon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import getSummary from "../http/getSummary";
import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-BR'
import PendingGoals from "./pendingGoals";

dayjs.locale(ptBR)


interface goalsPerDay{
    id:string,
    title:string,
    completedAt:string
}


export default function Summary(){

    const { data } = useQuery({
        queryKey:['summary'],
        queryFn: getSummary,
        staleTime: 1000 * 60 //60 seconds
    })

    if(!data){
        return null
    }

    const firstDayOfWeek = dayjs().startOf('week').format('DD MMM')
    const lastDayOfWeek = dayjs().endOf('week').format('DD MMM')
    const percentageComplete = Math.round((data?.completed * 100) / data?.total)

    return(
        <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <InOrbitIcon/>
                    <span className="text-lg font-semibold capitalize">{firstDayOfWeek} - {lastDayOfWeek}</span>
                </div>

                <DialogTrigger asChild>
                    <Button type="button" size="sm">
                        <Plus className="size-4"/>
                        Cadastrar meta
                    </Button>
               </DialogTrigger>
            </div>

            <div className="flex flex-col gap-3">
                <Progress value={8} max={15} >
                    <ProgressIndicator style={{width:`${percentageComplete}%`}}/>
                </Progress>

                <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Você completou <span className="text-zinc-100">{data?.completed}</span> de <span className="text-zinc-100">{data?.total}</span> metas nessa semana.</span>
                    <span>{percentageComplete}%</span>
                </div>
            </div>

            <Separator/>

            <PendingGoals/>

            <h2 className="text-xl font-medium">Sua semana</h2>

            {Object.entries(data.goalsPerDay).map(([date, goals]) =>{
                const weekDay = dayjs(date).format('dddd')
                const formatedDate = dayjs(date).format('DD [de] MMMM')
                return(
                    <div className="flex flex-col gap-6" key={date}>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-medium "><span className="capitalize">{weekDay}</span> <span className="text-zinc-400 text-sm">({formatedDate})</span></h3>

                            <ul className="flex flex-col gap-3">
                               {goals.map((goal:goalsPerDay) =>{
                                    const time = dayjs(goal.completedAt).format('HH:mm')

                                    return(
                                        <li className="flex items-center gap-2" key={goal.id}>
                                            <CheckCircle2 className="size-4 text-pink-500"/>
                                            <span className="text-sm text-zinc-400">Você completou "<span className="text-zinc-100">{goal.title}</span>" às <span className="text-zinc-100">{time}</span></span>
                                            <span className="text-sm text-zinc-400 underline underline-offset-2 cursor-pointer">Desfazer</span>
                                        </li>
                                    )
                               })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}