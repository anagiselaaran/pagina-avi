export interface User{
    id: number;
    company_name: string;
    p_iva: string;
    email: string;
    telefono: string;
    password?: string;
    role?: Rol
}

export enum Rol {
    writer,
    producer
}