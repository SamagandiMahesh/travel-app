export type CustomDate= {
    year: number;
    month: number;
    dayOfMonth: number;
    hourOfDay: number;
    minute: number;
    second: number;
  }
  
  export type Itinerary ={
    carrier: string;
    departureLocation: string;
    arrivalLocation: string;
    departureDate: CustomDate;
    arrivalDate: CustomDate;
    price: number;
  }
  
  export type ListProps = {
    label?: string;
    filteredList: Itinerary[];
  }