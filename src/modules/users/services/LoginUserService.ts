import { IUserRepository } from '../repositories/IUserRepository'
import { getSecret } from '../../../helpers/jwt';

const validator = require('validator');
const bcrypt = require('bcrypt');
const util = require('util');
const compare = util.promisify(bcrypt.compare);
const jwt = require('jsonwebtoken');


interface IRequest {
    email: string;
    password: string;
}

class LoginUserService {

    constructor(private userRepository: IUserRepository) { }

    async execute({ email, password }: IRequest) {

        if (!validator.isEmail(email)) {
            let response = {
                message: 'E-mail invalido',
                statusCode: 200
            }

            return response
        }


        let data
        let response = {
            message: '',
            token: '',
            statusCode: 200,
        }

        await this.userRepository.login({ email })
            .then(results => {
                data = results[0]
            }).catch(error => {
                console.log(error)
            })

        await compare(password, data.password)
            .then(result => {
                if (result) {
                    response.message = 'Logado'
                    response.statusCode = 200
                } else {
                    response.message = 'Dados invalidos'
                    response.statusCode = 200
                    return response
                }
            })
            .catch(err => {
                throw err;
            });


        const user = {
            id: data.id,
            name: data.name,
            email: data.email
        }

        const secretKey = getSecret();

        const token = jwt.sign(user, secretKey, { expiresIn: '2h' });

        response.token = token

        return response
    }
}

export { LoginUserService }