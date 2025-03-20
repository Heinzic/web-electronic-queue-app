import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ServiceState {
  selectedServiceId: string | null;
}

const initialState: ServiceState = {
  selectedServiceId: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSelectedServiceId: (state, action: PayloadAction<string | null>) => {
      state.selectedServiceId = action.payload;
    },
  },
});

export const { setSelectedServiceId } = serviceSlice.actions;

export const selectAvailableOffices = createSelector(
  [(state: RootState) => state.serviceSlice.selectedServiceId, 
   (state: RootState) => state.officeSlice.offices],
  (selectedServiceId, offices) => {
    if (!selectedServiceId) return offices;
    return offices.filter(office => 
      office.services.some(service => service.id === selectedServiceId)
    );
  }
);

export default serviceSlice.reducer;