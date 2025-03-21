import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AppointmentConfirmation() {
  const navigate = useNavigate();
  const selectedOffice = useAppSelector((state) => 
    state.officeSlice.offices.find(office => office.id === state.officeSlice.selectedOfficeId)
  );
  const selectedService = useAppSelector((state) => 
    state.officeSlice.offices
      .flatMap(office => office.services)
      .find(service => service.id === state.serviceSlice.selectedServiceId)
  );
  const selectedDate = useAppSelector((state) => state.dateTimeSlice.selectedDate);
  const selectedTimeSlot = useAppSelector((state) => state.dateTimeSlice.selectedTimeSlot);
  const userInfo = useAppSelector((state) => state.userSlice.userInfo);

  const handleConfirm = () => {
    
    navigate('/appointmentSuccess');
  };

  if (!selectedOffice || !selectedService || !selectedDate || !selectedTimeSlot || !userInfo) {
    return <div>Недостаточно информации для подтверждения записи.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Подтверждение записи</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Офис:</h3>
          <p>{selectedOffice.name}</p>
          <p>{selectedOffice.address}</p>
        </div>
        
        <div>
          <h3 className="font-semibold">Услуга:</h3>
          <p>{selectedService.title}</p>
        </div>
        
        <div>
          <h3 className="font-semibold">Дата и время:</h3>
          <p>{new Date(selectedDate).toLocaleDateString()} в {selectedTimeSlot}</p>
        </div>
        
        <div>
          <h3 className="font-semibold">Личная информация:</h3>
          <p>ФИО: {userInfo.lastName} {userInfo.firstName} {userInfo.middleName}</p>
          <p>Телефон: {userInfo.phone}</p>
          <p>Email: {userInfo.email}</p>
          {userInfo.comment && (
            <div>
              <h3 className="font-semibold mt-2">Комментарий:</h3>
              <p>{userInfo.comment}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex gap-4">
        <NavLink to="/userinfo">
          <Button variant="destructive">Назад</Button>
        </NavLink>
        <Button onClick={handleConfirm}>Подтвердить запись</Button>
      </div>
    </div>
  );
}