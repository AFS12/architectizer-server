import { IArchitectRepository } from '../repositories/IArchitectRepository'

const validator = require('validator');

interface IRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    age: number;
}

class CreateArchitectService {

    constructor(private architectRepository: IArchitectRepository) { }

    execute({ name, email, password, phone, gender, age }: IRequest) {

        if (!validator.isEmail(email)) {
            let response = {
                message: 'E-mail invalido',
                statusCode: 200
            }

            return response
        }

        this.architectRepository.create({ name, email, password, phone, gender, age })

        let response = {
            message: 'Cadastro Concluido',
            statusCode: 201
        }

        return response
    }
}

export { CreateArchitectService }