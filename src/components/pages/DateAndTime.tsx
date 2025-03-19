import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import DatePicker from "../ui/datepicker"
import { RadioCards, Text } from "@radix-ui/themes"
import { Button } from "../ui/button";
import { setSelectedDate, setSelectedTimeSlot } from '../../store/dateTimeSlice';
import { TimeSlot } from '../../types/TimeSlot';
import { useAppSelector } from '@/store/hooks';

export default function DateAndTime() {
  const dispatch = useDispatch();
  const storedDate = useAppSelector((state) => state.dateTimeSlice.selectedDate);
  const storedTimeSlot = useAppSelector((state) => state.dateTimeSlice.selectedTimeSlot);

  const [date, setDate] = useState<Date | undefined>(storedDate ? new Date(storedDate) : undefined);
  const [time, setTime] = useState<string | undefined>(storedTimeSlot || undefined);

  useEffect(() => {
    if (storedDate) {
      setDate(new Date(storedDate));
    }
    if (storedTimeSlot) {
      setTime(storedTimeSlot);
    }
  }, [storedDate, storedTimeSlot]);

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

  const handleDismiss = () => {
    setDate(undefined);
    setTime(undefined);
    dispatch(setSelectedDate(null));
    dispatch(setSelectedTimeSlot(null));
  };
  
  const isFormComplete = date && time;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center gap-[30px] flex-wrap">
          <div className="flex flex-col items-center">
            <DatePicker 
              date={date}
              setDateFunc={setDate} 
              width={400} 
              height={150} 
              iconSize={80} 
              textSize={32}
            />
            <div className="mx-auto mt-[40px] flex gap-[15px]">
              <Button 
                variant="destructive" 
                size={'lg'} 
                className='cursor-pointer'
                onClick={handleDismiss}
              >
                Отмена
              </Button>
              <Button 
                variant="default" 
                size={'lg'} 
                disabled={!isFormComplete} 
                onClick={handleSubmit}
                className='cursor-pointer'
              >
                Записаться
              </Button>
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

