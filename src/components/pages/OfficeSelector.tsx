import { useState } from 'react';
import { setSelectedOffice } from '../../store/officeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '../ui/button';
import { Office } from '../../types/Office';

const offices: Office[] = [
  { id: '1', name: 'Центральный офис', address: 'ул. Ленина, 1', workTime: '9:00 - 18:00' },
  { id: '2', name: 'Северный офис', address: 'пр. Мира, 15', workTime: '8:00 - 17:00' },
  { id: '3', name: 'Южный офис', address: 'ул. Гагарина, 7', workTime: '10:00 - 19:00' },
];

export default function OfficeSelector() {
  const dispatch = useAppDispatch();
  const storedOfficeId = useAppSelector((state) => state.officeSlice.selectedOfficeId);
  
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(storedOfficeId);

  const handleOfficeSelect = (officeId: string) => {
    setSelectedOfficeId(officeId);
  };

  const handleSubmit = () => {
    if (selectedOfficeId) {
      dispatch(setSelectedOffice(selectedOfficeId));
    }
  };

  const handleDismiss = () => {
    setSelectedOfficeId(null);
  };

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {offices.map((office) => (
        <label
          key={office.id}
          className={`
            flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all
            ${selectedOfficeId === office.id ? 'border-blue-500 bg-blue-50' : 'bg-white hover:border-blue-300'}
          `}
        >
          <input
            type="radio"
            name="office"
            value={office.id}
            checked={selectedOfficeId === office.id}
            onChange={() => handleOfficeSelect(office.id)}
            className="hidden"
          />
          <span className="text-xl font-bold mb-2">{office.name}</span>
          <span className="text-sm text-gray-600 mb-1">{office.address}</span>
          <span className="text-sm text-gray-600">Время работы: {office.workTime}</span>
        </label>
      ))}
        
      </div>
      <div className="flex gap-[15px]">
        <Button 
          variant="destructive" 
          size="lg" 
          onClick={handleDismiss}
          className="cursor-pointer"
        >
          Отмена
        </Button>
        <Button 
          variant="default" 
          size="lg" 
          onClick={handleSubmit}
          disabled={!selectedOfficeId}
          className="cursor-pointer"
        >
          Подтвердить
        </Button>
      </div>
      
    </div>
    
  );
};