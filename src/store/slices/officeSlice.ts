import { Office } from '@/types/Office';
import { Service } from '@/types/Service';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OfficeState {
  offices: Office[];
  selectedOfficeId: string | null;
}

const initialState: OfficeState = {
  offices: [
    {
      id: '1',
      name: 'Центральный офис',
      address: 'ул. Ленина, 1',
      workTime: '9:00 - 18:00',
      services: [
        { id: '1', title: 'МВД. Справки' },
        { id: '2', title: 'Кадастровый учет и регистрация прав' }
      ],
    },
    {
      id: '2',
      name: 'Северный офис',
      address: 'пр. Мира, 15',
      workTime: '8:00 - 17:00',
      services: [
        { id: '2', title: 'Кадастровый учет и регистрация прав' },
        { id: '3', title: 'Поступление на военную службу по контракту' }
      ],
    },
    {
      id: '3',
      name: 'Южный офис',
      address: 'ул. Гагарина, 7',
      workTime: '10:00 - 19:00',
      services: [
        { id: '1', title: 'МВД. Справки' },
        { id: '3', title: 'Поступление на военную службу по контракту' }
      ],
    },
  ],
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

export const getSelectedOfficeId = (state: OfficeState) => state.selectedOfficeId;
const selectOfficeSlice = (state: RootState) => state.officeSlice;

export const selectAvailableServices = createSelector(
  [selectOfficeSlice],
  (office) => {
    const { offices, selectedOfficeId } = office;

    // Get services based on the selected office
    let services: Service[];
    if (selectedOfficeId) {
      const selectedOffice = offices.find((office) => office.id === selectedOfficeId);
      services = selectedOffice ? selectedOffice.services : [];
    } else {
      // If no office is selected, get all services from all offices
      services = offices.flatMap((office) => office.services);
    }

    // Remove duplicates based on service id
    const uniqueServices = services.filter(
      (service, index, self) =>
        index === self.findIndex((foundService) => foundService.id === service.id)
    );

    return uniqueServices;
  }
);

export const { setSelectedOffice } = officeSlice.actions;

export default officeSlice.reducer;