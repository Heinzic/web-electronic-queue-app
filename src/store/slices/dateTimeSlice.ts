import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateTimeState {
  selectedDate: string | null;
  selectedTimeSlot: string | null;
}

const initialState: DateTimeState = {
  selectedDate: null,
  selectedTimeSlot: null,
};

const dateTimeSlice = createSlice({
  name: 'dateTime',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTimeSlot: (state, action: PayloadAction<string | null>) => {
      state.selectedTimeSlot = action.payload;
    },
  },
});

export const { setSelectedDate, setSelectedTimeSlot } = dateTimeSlice.actions;
export default dateTimeSlice.reducer;