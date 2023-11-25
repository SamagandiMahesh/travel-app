export type ItineraryDate =  {
    year: number;
    month: number;
    dayOfMonth: number;
    hourOfDay: number;
    minute: number;
    second: number;
  }
  
  export type Itinerary  = {
    carrier: string;
    departureLocation: string;
    arrivalLocation: string;
    departureDate: ItineraryDate;
    arrivalDate: ItineraryDate;
    price: number;
  }
  