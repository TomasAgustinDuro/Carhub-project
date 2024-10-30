
export default interface Car {
  id: string; 
  model: string; 
  version: string;
  year: number; 
  mileage: number; 
  transmission:'Manual' | 'Automático' | 'Semiautomático'; 
  price: number; // Precio
  type_fuel: 'nafta' | 'diesel' | 'GNC' | 'Eléctrico' | 'Híbrido'; // Tipo de combustible
  tank_capacity: number; // Capacidad del tanque
  horsepower: number; // Potencia
  doors: number; // Número de puertas
  drive_type: 'FWD' | 'RWD' | 'AWD' | '4WD'; // Tipo de tracción
  wheel_material: string; // Material de las ruedas
  wheel_size: number; // Tamaño de las ruedas
  abs: boolean; // Si tiene ABS
  traction_control: boolean; // Si tiene control de tracción
  upholstery: string; // Tapicería
  radio: boolean; // Si tiene radio
  bluetooth: boolean; // Si tiene Bluetooth
  usb: boolean; // Si tiene puerto USB
  images: string[]; 
}
