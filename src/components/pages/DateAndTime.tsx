import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from "../ui/datepicker"
import { RadioCards, Text } from "@radix-ui/themes"
import { Button } from "../ui/button";
import { setSelectedDate, setSelectedTimeSlot } from '../../store/dateTimeSlice';
import { RootState } from '../../store/store';

interface TimeSlot {
  id: string;
  time: string;
}

export default function DateAndTime() {
  const dispatch = useDispatch();
  const { selectedDate, selectedTimeSlot } = useSelector((state: RootState) => state.dateTimeSlice);

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 - 10:00" },
    { id: "2", time: "10:00 - 11:00" },
    { id: "3", time: "11:00 - 12:00" },
    { id: "4", time: "13:00 - 14:00" },
    { id: "5", time: "14:00 - 15:00" },
    { id: "6", time: "15:00 - 16:00" },
  ];

  const handleDateChange: React.Dispatch<React.SetStateAction<Date | undefined>> = (dateOrFunction) => {
    const newDate = typeof dateOrFunction === 'function' ? dateOrFunction(selectedDate ? new Date(selectedDate) : undefined) : dateOrFunction;
    dispatch(setSelectedDate(newDate ? newDate.toISOString() : null));
  };

  const handleTimeSlotChange = (value: string) => {
    dispatch(setSelectedTimeSlot(value));
  };

  const isFormComplete = selectedDate && selectedTimeSlot;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center gap-[30px] flex-wrap">
          <div className="flex flex-col items-center">
            <DatePicker 
              date={selectedDate ? new Date(selectedDate) : undefined} 
              setDateFunc={handleDateChange} 
              width={400} 
              height={200} 
              iconSize={80} 
              textSize={30}
            />
            <div className="mx-auto mt-[40px] flex gap-[15px]">
              <Button variant="destructive">Отмена</Button>
              <Button variant="default" disabled={!isFormComplete}>Записаться</Button>
            </div>
        </div>
        {selectedDate && (
          <RadioCards.Root 
            columns={{ sm: "3" }} 
            size={'3'} 
            color="crimson" 
            highContrast 
            className="max-w-[700px] w-[100%]"
            onValueChange={handleTimeSlotChange}
            value={selectedTimeSlot || undefined}
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

