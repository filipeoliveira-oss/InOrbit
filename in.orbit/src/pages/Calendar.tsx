import { Calendar as DatePicker } from "@/components/ui/calendar"
import {ptBR} from 'date-fns/locale'

export default function Calendar(){
    return(
        <div className="h-screen py-10 max-w-[480px] px-5 mx-auto flex flex-col items-center justify-center border-red-100 border-2 ">
            <DatePicker 
                mode="single"
                numberOfMonths={1} 
                locale={ptBR}
                className="rounded-md border shadow w-full flex items-center"
                classNames={{
                    months:"flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                    month: "space-y-4 w-full flex flex-col",
                    table: "w-full h-full border-collapse space-y-1",
                    head_row: "",
                    row: "w-full mt-2",
                  }}
            />
        </div>
    )
}