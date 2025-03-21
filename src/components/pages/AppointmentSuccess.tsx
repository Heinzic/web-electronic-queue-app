import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import resetData from '@/helpers/resetData';

export default function AppointmentSuccess() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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

    if (!selectedOffice || !selectedService || !selectedDate || !selectedTimeSlot || !userInfo) {
        return <div>Произошла ошибка при обработке вашей записи.</div>;
    }

    const handleBackToHome = () => {
        resetData(dispatch);
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-green-600">Запись успешно подтверждена!</h2>
            
            <div className="space-y-4">
                <p className="text-lg">Спасибо, {userInfo.firstName} {userInfo.lastName}, ваша запись подтверждена.</p>
                
                <div>
                <h3 className="font-semibold">Детали записи:</h3>
                <p><strong>Услуга:</strong> {selectedService.title}</p>
                <p><strong>Дата и время:</strong> {new Date(selectedDate).toLocaleDateString()} в {selectedTimeSlot}</p>
                <p><strong>Офис:</strong> {selectedOffice.name}</p>
                <p><strong>Адрес:</strong> {selectedOffice.address}</p>
                </div>
                
                <div className="mt-6">
                <h3 className="font-semibold">Важная информация:</h3>
                <ul className="list-disc list-inside">
                    <li>Пожалуйста, придите за 10 минут до назначенного времени.</li>
                    <li>Не забудьте взять с собой необходимые документы.</li>
                    <li>Если вам нужно отменить или перенести запись, пожалуйста, сообщите нам заранее.</li>
                </ul>
                </div>
                
                <p className="mt-6">
                Мы отправили подтверждение на ваш email: <strong>{userInfo.email}</strong>
                </p>
            </div>
            
            <div className="mt-8">
                <Button onClick={handleBackToHome}>Вернуться на главную</Button>
            </div>
        </div>
  );
}