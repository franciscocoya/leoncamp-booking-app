import axios from 'axios';

import { API_BOOKINGS } from "@/helpers/apiRoutes";

axios.defaults.headers.common = { 
    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
};


/**
 * Obtención de la reserva con el id pasado como parámetro.
 * 
 * @param bookingId
 * 
 * @returns
 */
const getBookingDataByBookingId = async (bookingId: string): Promise<any> => {
    const { data } = await axios.get(`${API_BOOKINGS}/${bookingId}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
        }
    });
    
    return data;
}

export {
    getBookingDataByBookingId
}