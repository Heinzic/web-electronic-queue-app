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
}

export default function DatePicker({date, setDateFunc}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger >
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", {locale:ru}) : <span>Выберите дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDateFunc} />
      </PopoverContent>
    </Popover>
  )
}