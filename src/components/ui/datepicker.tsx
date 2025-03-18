import { format } from "date-fns"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { ru } from "react-day-picker/locale"

interface DatePickerProps {
  date: Date | undefined;  // undefined if no date selected yet
  setDateFunc: React.Dispatch<React.SetStateAction<Date | undefined>>
  width?: number
  height?: number
  iconSize?: number
  textSize?: number
}

export default function DatePicker({date, setDateFunc, width = 200, height = 50, iconSize = 40, textSize = 12}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger >
        <Button
          variant={"outline"}
          className={cn(
            `w-[${width}px] h-[${height}px] justify-around text-left text-[${textSize}px] font-normal cursor-pointer`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon size={iconSize} />
          {date ? format(date, "PPP", {locale:ru}) : <span>Выберите дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar mode="single" selected={date} onSelect={setDateFunc} />
      </PopoverContent>
    </Popover>
  )
}