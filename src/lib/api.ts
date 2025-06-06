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
  roomName: string;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  roomId: string;
  ratePlanId: string;
  boardCode: string;
  currency: string;
  totalPrice: number;
  guestCount: {
    adults: number;
    childrenAges: number[];
  };
}

interface RedeemTokenParams {
  name: string;
  email: string;
}

interface CheckBookingParams {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  occupancy: {
    rooms: number;
    adults: number;
    childrenAges: number[];
  };
  roomId: string;
  ratePlanId: string;
  currency: string;
  totalPrice: number;
}

export interface HotelImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface HotelResponse {
  id: number;
  hotel_id: string;
  hotel_name: string;
  city_name: string;
  country_code: string;
  address: string;
  telephone: string;
  longitude: string;
  latitude: string;
  star: number;
  images: HotelImage[];
  amenities: string[];
  room_types: string[];
  rooms: Room[];
}

export interface Room {
  name: string;
  roomId: string;
  rates: RatePlan[];
}

export interface RatePlan {
  ratePlanId: string;
  boardCode: string;
  allotment: number;
  price: number;
  isInstantConfirm: boolean;
}

interface HotelSearchParams {
  check_in: string;
  check_out: string;
  occupancy: {
    adults: number;
    rooms: number;
    children: number;
  };
}

export interface Booking {
  id: number;
  user: number;
  hotel: HotelResponse;
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  total_price: string;
  status: string;
  created_at: string;
  updated_at: string;
  underdog_status: string;
  underdog_error: string | null;
  bingtrip_status: string;
  bingtrip_error: string | null;
  transaction_id: string;
  nft_id: number;
  mint_address: string;
  room_name: string;
  board_code: string;
  adults: number;
  children: number;
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
    'http://127.0.0.1:8000/api/bookings/',
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

export const getHotelDetails = async (id: string, params?: HotelSearchParams): Promise<HotelResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params) {
    // Convert dates to YYYY-MM-DD format
    const checkInDate = new Date(params.check_in);
    const checkOutDate = new Date(params.check_out);
    
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      throw new Error('Invalid date format');
    }
    
    queryParams.append('check_in', format(checkInDate, 'yyyy-MM-dd'));
    queryParams.append('check_out', format(checkOutDate, 'yyyy-MM-dd'));
    queryParams.append('occupancy[adults]', params.occupancy.adults.toString());
    queryParams.append('occupancy[rooms]', params.occupancy.rooms.toString());
    queryParams.append('occupancy[children]', params.occupancy.children.toString());
  }

  const response = await axios.get<HotelResponse>(
    `http://127.0.0.1:8000/api/hotels/${id}/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
    {
      headers: {
        'accept': 'application/json',
        'Authorization': `Token ${import.meta.env.VITE_BACKEND_API_TOKEN}`
      }
    }
  );
  
  return response.data;
}; 

export const checkBooking = async (params: CheckBookingParams) => {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/bookings/check/',
    params,
    {
      headers: {
        'Authorization': `Token ${import.meta.env.VITE_BACKEND_API_TOKEN}`
      }
    }
  );
  
  return response.data;
}; 

export const getBookings = async (mintAddresses: string[]): Promise<Booking[]> => {
  const queryParams = new URLSearchParams();
  mintAddresses.forEach(address => {
    queryParams.append('mint_addresses[]', address);
  });

  const response = await axios.get<Booking[]>(
    `http://127.0.0.1:8000/api/bookings/?${queryParams.toString()}`,
    {
      headers: {
        'Authorization': `Token ${import.meta.env.VITE_BACKEND_API_TOKEN}`
      }
    }
  );
  
  return response.data;
}; 