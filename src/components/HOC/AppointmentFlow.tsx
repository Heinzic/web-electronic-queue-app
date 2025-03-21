import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export default function AppointmentFlow({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const selectedOfficeId = useAppSelector((state) => state.officeSlice.selectedOfficeId);
  const selectedServiceId = useAppSelector((state) => state.serviceSlice.selectedServiceId);
  const selectedDate = useAppSelector((state) => state.dateTimeSlice.selectedDate);
  const selectedTimeSlot = useAppSelector((state) => state.dateTimeSlice.selectedTimeSlot);

  useEffect(() => {
    if (selectedOfficeId && selectedServiceId && selectedDate && selectedTimeSlot) {
      navigate('/userinfo');
    }
  }, [selectedOfficeId, selectedServiceId, selectedDate, selectedTimeSlot, navigate]);

  return <>{children}</>;
}