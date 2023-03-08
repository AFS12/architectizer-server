import { Architect } from "../model/architect";

interface ICreateArchitectDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    age: number;
}

interface IArchitectRepository {
    create({ name, email, password, phone, gender, age }: ICreateArchitectDTO): void
}

export { IArchitectRepository, ICreateArchitectDTO }