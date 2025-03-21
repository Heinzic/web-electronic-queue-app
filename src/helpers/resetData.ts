import { useAppDispatch } from "@/store/hooks";
import { setSelectedDate, setSelectedTimeSlot } from "@/store/slices/dateTimeSlice";
import { setSelectedOffice } from "@/store/slices/officeSlice";
import { setSelectedServiceId } from "@/store/slices/serviceSlice";

export default function resetData() {
    const dispatch = useAppDispatch();

    dispatch(setSelectedOffice(null));
    dispatch(setSelectedServiceId(null));
    dispatch(setSelectedDate(null));
    dispatch(setSelectedTimeSlot(null));
}