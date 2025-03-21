import { useState } from 'react';
import { setSelectedOffice } from '../../store/slices/officeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '../ui/button';
import { selectAvailableOffices } from '@/store/slices/serviceSlice';
import { useNavigate } from 'react-router-dom';

export default function OfficeSelector() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedServiceId = useAppSelector((state) => state.serviceSlice.selectedServiceId);
  const offices = selectedServiceId? useAppSelector(selectAvailableOffices): useAppSelector((state) => state.officeSlice.offices);
  const storedOfficeId = useAppSelector((state) => state.officeSlice.selectedOfficeId);

  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(storedOfficeId);

  const handleOfficeSelect = (officeId: string) => {
    setSelectedOfficeId(officeId);
  };

  const handleSubmit = () => {
    if (selectedOfficeId) {
      dispatch(setSelectedOffice(selectedOfficeId));
      navigate('/')
    }
  };

  const handleDismiss = () => {
    navigate('/')
  };

  return (
    <>
      <h2>Доступные офисы</h2>
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
    </>
    
  );
};