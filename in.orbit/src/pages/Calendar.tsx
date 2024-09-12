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
import disapointed from '../assets/disapointed.png'
import sick from '../assets/sick.png'
import sleepy from '../assets/sleepy.png'
import woozy from '../assets/woozy.png'
import questionMark from '../assets/question.png'
import { z } from "zod"
import { TextBox } from "@/components/ui/textBox"
import { Button } from "@/components/ui/button_nlw"
import inOrbitIcon from "../assets/logo-inorbit.svg"
const createCalendarSchema = z.object({
    mood: z.string(),
    journal: z.string().max(500, 'Mensagem muito longa'),
})

export default function Calendar() {
    const { register, control, formState, getValues, handleSubmit, watch } = useForm<z.infer<typeof createCalendarSchema>>({
        defaultValues: {
            journal: '',
            mood: ''
        }
    })
    const [mood, setMood] = useState<string>(questionMark)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const journalW = watch('journal')

    function handleMood(mood: string) {
        switch (mood) {
            case 'happy':
                setMood(happy)
                break;
            case 'sad':
                setMood(sad)
                break;
            case 'angry':
                setMood(angry)
                break;
            case 'relieved':
                setMood(disapointed)
                break;
            case 'sick':
                setMood(sick)
                break;
            case 'sleepy':
                setMood(sleepy)
                break;
            case 'woozy':
                setMood(woozy)
                break;
            default:
                setMood(questionMark)
        }
    }

    function handleSaveMood(data: z.infer<typeof createCalendarSchema>) {
        alert(data)
    }

    return (
        <div className="h-screen py-10 max-w-[80%] px-5 mx-auto flex items-center justify-center flex-col">
            <img src={inOrbitIcon} alt="In.Orbit Logo" className="h-28"/>
            <div className="flex w-full h-full">
                <div className="w-full flex flex-col justify-center items-center flex-1">
                    <DatePicker
                        mode="single"
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
                        onSelect={setDate}
                    />
                    <div>
                        Histórico da semana
                    </div>
                </div>

                <Separator className="bg-zinc-500 h-full w-px" />

                <div className="flex-1 flex flex-col w-full pl-5 relative items-center">
                    {/* <MoodEmoji emoji={<SadFace/>}/> */}
                    <div className=" w-80 h-80 flex justify-center items-center ">
                        {mood && (
                            <img src={mood} alt="Current Mood" className="w-full h-full select-none " />
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

                                        <RadioGroupItem value="desapointed" onClick={() => handleMood('relieved')}>
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

                        <Button type="submit">Registrar dia</Button>
                    </form>

                </div>
            </div>
        </div>
    )
}