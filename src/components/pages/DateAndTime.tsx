import { useState } from 'react';
import { useDispatch } from 'react-redux'
import DatePicker from "../ui/datepicker"
import { RadioCards, Text } from "@radix-ui/themes"
import { Button } from "../ui/button";
import { setSelectedDate, setSelectedTimeSlot } from '../../store/dateTimeSlice';

interface TimeSlot {
  id: string;
  time: string;
}

export default function DateAndTime() {

  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState<string | undefined>();

  const dispatch = useDispatch();

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 - 10:00" },
    { id: "2", time: "10:00 - 11:00" },
    { id: "3", time: "11:00 - 12:00" },
    { id: "4", time: "13:00 - 14:00" },
    { id: "5", time: "14:00 - 15:00" },
    { id: "6", time: "15:00 - 16:00" },
  ];

  const handleSubmit = () => {
    dispatch(setSelectedDate(date ? date.toISOString() : null));
    dispatch(setSelectedTimeSlot(time ? time : null));
  };

  const isFormComplete = date && time;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center gap-[30px] flex-wrap">
          <div className="flex flex-col items-center">
            <DatePicker 
              date={date ? new Date(date) : undefined} 
              setDateFunc={setDate} 
              width={400} 
              height={200} 
              iconSize={80} 
              textSize={30}
            />
            <div className="mx-auto mt-[40px] flex gap-[15px]">
              <Button variant="destructive" size={'lg'} className='cursor-pointer'>Отмена</Button>
              <Button variant="default" size={'lg'} disabled={!isFormComplete} 
              onClick={handleSubmit}
              className='cursor-pointer'>Записаться</Button>
            </div>
        </div>
        {date && (
          <RadioCards.Root 
            columns={{ sm: "3" }} 
            size={'3'} 
            color="crimson" 
            highContrast 
            className="max-w-[700px] w-[100%]"
            onValueChange={(selectedTime) => setTime(selectedTime)}
            value={time || undefined}
          >
            {timeSlots.map((slot) => (
              <RadioCards.Item key={slot.id} value={slot.id}>
                <Text>{slot.time}</Text>
              </RadioCards.Item>
            ))}
          </RadioCards.Root>
        )}
      </div>
    </div>
  )
}

