
export default interface Car {
  id: string; // ID del auto, por ejemplo, UUID
  model: string; // Modelo del auto
  year: number; // Año del auto
  mileage: number; // Kilometraje
  transmission: string; // Transmisión (Automática, Manual, etc.)
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
  images: string[]; // Array de URLs de las imágenes
}
