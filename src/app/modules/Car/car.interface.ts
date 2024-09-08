export type TCarStatus = "available" | "unavailable";

// car interface
export interface ICar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: TCarStatus;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
}
