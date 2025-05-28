import { image } from "./ImageInterface";

export interface Car {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  transmission: string;
  price: number;
  fuel: string;
  tank: string;
  horsePower: string;
  mileage: number;
  doors: number;
  traction: string;
  wheelMaterial: string;
  wheelSize: string;
  abs: boolean;
  tractionControl: boolean;
  radio: boolean;
  bluetooth: boolean;
  usb: boolean;
  images: image[];
}
