import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OfficeState {
  selectedOfficeId: string | null;
}

const initialState: OfficeState = {
  selectedOfficeId: null,
};

const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    setSelectedOffice: (state, action: PayloadAction<string | null>) => {
      state.selectedOfficeId = action.payload;
    },
  },
});

export const { setSelectedOffice } = officeSlice.actions;
export default officeSlice.reducer;