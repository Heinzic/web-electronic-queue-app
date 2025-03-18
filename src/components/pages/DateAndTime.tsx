import { useEffect, useState } from "react"
import DatePicker from "../ui/datepicker"

export default function DateAndTime() {
  const [date, setDate] = useState<Date>()

  return (
    <DatePicker date={date} setDateFunc={setDate}/>
  )
}