import * as React from "react"

import DatePicker from "../ui/datepicker"

export default function DateAndTime() {
  const [date, setDate] = React.useState<Date>()

  return (
    <DatePicker date={date} setDateFunc={setDate}/>
  )
}