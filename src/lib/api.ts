import axios from "axios";
import { format } from "date-fns";
import { HotelListing } from "@/data/hotels";

interface SearchParams {
  location: string;
  dateFrom?: Date;
  dateTo?: Date;
  rooms: number;
  adults: number;
  children: number;
}

interface CreateBookingParams {
  receiverAddress: string;
  name: string;
  description: string;
  image: string;
}

interface RedeemTokenParams {
  name: string;
  email: string;
}

export const searchHotels = async (params: SearchParams): Promise<HotelListing[]> => {
  const response = await axios.get<HotelListing[]>(`http://127.0.0.1:8000/api/search`, {
    params: {
      location: params.location,
      check_in: params.dateFrom ? format(params.dateFrom, 'yyyy-MM-dd') : undefined,
      check_out: params.dateTo ? format(params.dateTo, 'yyyy-MM-dd') : undefined,
      occupancy: { 
        rooms: params.rooms, 
        adults: params.adults, 
        children: params.children 
      }
    },
    headers: {
      'Authorization': `Token ${import.meta.env.VITE_BACKEND_API_TOKEN}`
    }
  });
  
  return response.data;
}; 

export const createBooking = async (params: CreateBookingParams) => {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/bookings',
    params,
    {
      headers: {
        'Authorization': `Token ${import.meta.env.VITE_BACKEND_API_TOKEN}`
      }
    }
  );
  
  return response.data;
}; 

export const redeemToken = async (tokenId: string, params: RedeemTokenParams) => {
  const response = await axios.put(
    `http://127.0.0.1:8000/api/bookings/${tokenId}`,
    params,
    {
      headers: {
        'Authorization': `Token ${import.meta.env.VITE_BACKEND_API_TOKEN}`
      }
    }
  );
  
  return response.data;
}; 