interface Turno {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    dia: string; // Podría ser de tipo 'Date' si deseas manejar fechas.
    horario: string; // Podría ser de tipo 'string' o un 'Date' también.
    mensaje_adicional?: string; // Este es opcional si decides incluirlo.
}

export default Turno;
