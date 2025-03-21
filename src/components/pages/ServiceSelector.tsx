import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAvailableServices } from "@/store/slices/officeSlice";
import { setSelectedServiceId } from "@/store/slices/serviceSlice";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ServiceSelector() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const availableServices = useAppSelector((state) => selectAvailableServices(state));
    const selectedServiceId = useAppSelector((state) => state.serviceSlice.selectedServiceId);
    const [selectedService, setSelectedService] = useState<string | null>(selectedServiceId);

    const handleDismiss = () => {
        navigate('/')
    };
    const handleServiceSelect = (serviceId: string) => {
        setSelectedService(serviceId);
    };

    const handleSubmit = () => {
        if (selectedService) {
            dispatch(setSelectedServiceId(selectedService));
            navigate('/')
        }
    };
    return ( 
        <div>
            <h2>Доступные услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableServices.map((service) => (
                    <label
                    key={service.id}
                    className={`
                        flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all bg-white
                        ${selectedService === service.id ? 'border-blue-500' : 'hover:border-blue-300'}
                    `}
                    >
                    <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={() => handleServiceSelect(service.id)}
                        className="hidden"
                    />
                    <span className="text-xl font-bold">{service.title}</span>
                    </label>
                ))}
            </div>
            <div className="mx-auto mt-[15px] flex gap-[15px]">
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
                disabled={!selectedService} 
                onClick={handleSubmit}
                className='cursor-pointer'
              >
                Записаться
              </Button>
            </div>
        </div>
    );
}




export default ServiceSelector;