import { setSelectedDate, setSelectedTimeSlot } from "@/store/slices/dateTimeSlice";
import { setSelectedOffice } from "@/store/slices/officeSlice";
import { setSelectedServiceId } from "@/store/slices/serviceSlice";
import { Dispatch } from "@reduxjs/toolkit";

export default function resetData(dispatch: Dispatch) {
    dispatch(setSelectedOffice(null));
    dispatch(setSelectedServiceId(null));
    dispatch(setSelectedDate(null));
    dispatch(setSelectedTimeSlot(null));
}