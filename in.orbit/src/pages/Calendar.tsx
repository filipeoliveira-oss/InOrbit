import { Calendar as DatePicker, } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { ptBR } from 'date-fns/locale'
import { Controller, useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import happy from '../assets/happy.png'
import sad from '../assets/sad.png'
import angry from '../assets/angry.png'
import disappointed from '../assets/disappointed.png'
import sick from '../assets/sick.png'
import sleepy from '../assets/sleepy.png'
import woozy from '../assets/woozy.png'
import questionMark from '../assets/question.png'
import { z } from "zod"
import { TextBox } from "@/components/ui/textBox"
import { Button } from "@/components/ui/button_nlw"
import inOrbitIcon from "../assets/logo-inorbit.svg"
import createMood from "@/http/createMood"
import { ToastContainer, toast } from 'react-toastify';
import { useQuery, useQueryClient } from "@tanstack/react-query"
import getWeekMood from "@/http/getWeekMood"
import dayjs from "dayjs"

const createCalendarSchema = z.object({
    mood: z.string(),
    journal: z.string().min(10).max(500, 'Mensagem muito longa'),
    date: z.coerce.date()
})

interface weekMoodInterface {
    mood: string;
    date: Date;
}

export default function Calendar() {

    const queryClient = useQueryClient()
    const [date, setDate] = useState<Date>(new Date())
    const [moodEmoji, setMoodEmoji] = useState<string>(questionMark)
    const [dataError, setDataError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const {data: weekMood} = useQuery({
        queryKey:['weekMood'],
        queryFn: getWeekMood,
        staleTime: Infinity
    })

    const { register, control, formState, handleSubmit, watch, setValue } = useForm<z.infer<typeof createCalendarSchema>>({
        defaultValues: {
            journal: '',
            mood: '',
            date: date
        }
    })

    const journalW = watch('journal')

    const WeekDayMood = ({moodDay}:{moodDay:weekMoodInterface}) =>{
        const weekDay = dayjs(moodDay.date).format('dddd')

        function getEmoji(){
            switch (moodDay.mood) {
                case 'happy':
                    return happy
                case 'sad':
                    return sad
                case 'angry':
                    return angry
                case 'disappointed':
                    return disappointed
                case 'sick':
                    return sick
                case 'sleepy':
                    return sleepy
                case 'woozy':
                    return woozy
                default:
                    return questionMark
            }
        }

        return(
            <div className="flex flex-col justify-center items-center min-w-20 h-full cursor-pointer px-1 ">
                <img src={getEmoji()} alt="Current Mood" className="max-w-20 h-full select-none" />
                <Label className="capitalize">{weekDay}</Label>
            </div>
        )
    }

    function handleMood(mood: string) {
        switch (mood) {
            case 'happy':
                setMoodEmoji(happy)
                break;
            case 'sad':
                setMoodEmoji(sad)
                break;
            case 'angry':
                setMoodEmoji(angry)
                break;
            case 'disappointed':
                setMoodEmoji(disappointed)
                break;
            case 'sick':
                setMoodEmoji(sick)
                break;
            case 'sleepy':
                setMoodEmoji(sleepy)
                break;
            case 'woozy':
                setMoodEmoji(woozy)
                break;
            default:
                setMoodEmoji(questionMark)
        }
    }

    async function handleSaveMood(data: z.infer<typeof createCalendarSchema>) {

        if(data.journal == '' && data.mood == ''){
            setDataError(true)

            return
        }

        if(data.date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)){
            setDateError(true)

            return
        }

        await createMood({
            mood: data.mood,
            journal:data.journal,
            date: data.date
        }).then(() =>{
            toast.success('Seu sentimento foi salvo')
            queryClient.invalidateQueries({queryKey:['weekMood']})
        }).catch(() =>{
            toast.error('Ocorreu um erro no registro, tente novamente')
        }).finally(() =>{
            setDataError(false)
            setDateError(false)
        })
    }

    function handleDatePick(date:Date | undefined){
        if(!date){
            return null
        } 
        if(date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)){
            setDateError(true)
        }else{
            setDate(date)
            setValue('date', date)
            setDateError(false)
        }
    }


    return (
        <div className="h-screen py-10 max-w-[80%] px-5 mx-auto flex items-center justify-center flex-col">
            <ToastContainer />
            <img src={inOrbitIcon} alt="In.Orbit Logo" className="h-28"/>
            <div className="flex w-full h-full">
                <div className="w-full flex flex-col justify-center items-center flex-1 gap-4">
                    <DatePicker
                        mode="single"
                        required
                        numberOfMonths={1}
                        locale={ptBR}
                        className="rounded-md pr-5 shadow w-full flex items-center"
                        classNames={{
                            months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                            month: "space-y-4 w-full flex flex-col",
                            table: "w-full h-full border-collapse space-y-1",
                            head_row: "",
                            row: "w-full mt-2",
                            day_today:'bg-zinc-500',
                            day_selected:'bg-violet-500',
                        }}
                        selected={date}
                        onSelect={handleDatePick}
                    />
                        <div className="h-5 self-start">
                            {dateError && (
                                <p className="text-red-400 text-sm">Você não pode selecionar uma data futura</p>
                            )}
                        </div>
                    <div className="flex flex-col gap-4 w-full  items-center h-fit min-h-24">
                        <Label>Histórico da semana <span className="text-zinc-400">({dayjs().startOf('week').format('DD MMM')} - {dayjs().endOf('week').format('DD MMM')})</span></Label>
                        <div className="flex w-full h-full gap-3 justify-center">
                            {weekMood && (weekMood.map((day:weekMoodInterface) =>{
                                return(
                                    <WeekDayMood  moodDay={day}/>
                                )
                            }))}
                        </div>
                    </div>
                </div>

                <Separator className="bg-zinc-500 h-full w-px" />

                <div className="flex-1 flex flex-col w-full pl-5 relative items-center">
                    {/* <MoodEmoji emoji={<SadFace/>}/> */}
                    <div className=" w-80 h-80 flex justify-center items-center ">
                        {moodEmoji && (
                            <img src={moodEmoji} alt="Current Mood" className="w-full h-full select-none " />
                        )}
                    </div>

                    <form onSubmit={handleSubmit(handleSaveMood)} className="z-10 flex flex-col h-full justify-evenly">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Como você se sente?</Label>
                            <Controller control={control} name="mood" defaultValue={''} render={({ field }) => {
                                return (
                                    <RadioGroup onValueChange={field.onChange} value={String(field.value)} style={{ flexDirection: 'row' }} >
                                        <RadioGroupItem value="happy" onClick={() => handleMood('happy')}>
                                            <span className="text-zinc-300 text-sm font-medium leading-none">Feliz</span>
                                        </RadioGroupItem>

                                        <RadioGroupItem value="sad" onClick={() => handleMood('sad')}>
                                            <span className="text-zinc-300 text-sm font-medium leading-none">Triste</span>
                                        </RadioGroupItem>

                                        <RadioGroupItem value="angry" onClick={() => handleMood('angry')}>
                                            <span className="text-zinc-300 text-sm font-medium leading-none">Estressado</span>
                                        </RadioGroupItem>

                                        <RadioGroupItem value="disappointed" onClick={() => handleMood('disappointed')}>
                                            <span className="text-zinc-300 text-sm font-medium leading-none">Desapontado</span>
                                        </RadioGroupItem>

                                        <RadioGroupItem value="sick" onClick={() => handleMood('sick')}>
                                            <span className="text-zinc-300 text-sm font-medium leading-none">Enjoado</span>
                                        </RadioGroupItem>

                                        <RadioGroupItem value="sleepy" onClick={() => handleMood('sleepy')}>
                                            <span className="text-zinc-300 text-sm font-medium leading-none">Sonolento</span>
                                        </RadioGroupItem>

                                        <RadioGroupItem value="woozy" onClick={() => handleMood('woozy')}>
                                            <span className="text-zinc-300 text-sm font-medium leading-none">Tonto</span>
                                        </RadioGroupItem>
                                    </RadioGroup>
                                )
                            }} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex w-full justify-between">
                                <Label htmlFor="title">Como foi o seu dia?</Label>
                                <Label htmlFor="title">{journalW.length}/500</Label>
                            </div>
                            <TextBox id="title" {...register('journal')} className="resize-none" maxLength={500} />
                            {formState.errors.journal && (
                                <p className="text-red-400 text-sm">{formState.errors.journal.message}</p>
                            )}
                        </div>

                        <div className="w-full h-fit flex flex-col gap-2">
                            <Button type="submit">Registrar dia</Button>
                            <div className="h-5">
                                {dataError && (
                                    <p className="text-red-400 text-sm">Preencha pelo menos um dos campos</p>
                                )}
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}