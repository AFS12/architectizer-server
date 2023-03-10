import { IUserRepository } from '../repositories/IUserRepository'

const validator = require('validator');

interface IRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    age: number;
    type: string;
}

class CreateUserService {

    constructor(private userRepository: IUserRepository) { }

    execute({ name, email, password, phone, gender, age, type }: IRequest) {

        if (!validator.isEmail(email)) {
            let response = {
                message: 'E-mail invalido',
                statusCode: 204
            }

            return response
        }

        this.userRepository.create({ name, email, password, phone, gender, age, type })

        let response = {
            message: 'Cadastro Concluido',
            statusCode: 201
        }

        return response
    }
}

export { CreateUserService }