export type TCarStatus = "available" | "unavailable";

// car interface
export interface ICar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  year: string;
  type: string;
  image: string;
  status: TCarStatus;
  model: string;
  pricePerHour: number;
  isDeleted: boolean;
  gps?: boolean;
  childSeat?: boolean;
  location?: string;
  availabilityDates?: string[];
  isFeatured: boolean;
}

export interface ICarReturn {
  bookingId: string;
  endTime: Date;
}
