import { User } from "../model/User";

interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    age: number;
    type: string;
}

interface IUserRepository {
    create({ name, email, password, phone, gender, age, type }: ICreateUserDTO): void
}

export { IUserRepository, ICreateUserDTO }