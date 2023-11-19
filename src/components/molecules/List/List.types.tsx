export interface CustomDate {
    year: number;
    month: number;
    dayOfMonth: number;
    hourOfDay: number;
    minute: number;
    second: number;
  }
  
  export interface Itinerary {
    carrier: string;
    departureLocation: string;
    arrivalLocation: string;
    departureDate: CustomDate;
    arrivalDate: CustomDate;
    price: number;
  }
  
  export interface ListProps {
    label?: string;
    filteredList: Itinerary[];
  }