
interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    age: number;
    type: string;
}

interface ILoginDTO {
    email: string
}

interface IGetUserDTO {
    id: string
}

interface IUserRepository {
    create({ name, email, password, phone, gender, age, type }: ICreateUserDTO): void
    login({ email }: ILoginDTO): Promise
    getUser({ id }: IGetUserDTO): Promise
    getArchitects(): Promise
}

export { IUserRepository, ICreateUserDTO, ILoginDTO, IGetUserDTO }