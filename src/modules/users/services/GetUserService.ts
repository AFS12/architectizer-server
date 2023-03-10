import { getSecret } from "../../../helpers/jwt";
import { IUserRepository } from "../repositories/IUserRepository";

const jwt = require('jsonwebtoken');

interface IRequest {
    token: string;
}

class GetUserService {
    constructor(private userRepository: IUserRepository) { }

    async execute({ token }: IRequest) {

        const secret = getSecret()

        const data = jwt.verify(token, secret);

        let user: object

        await this.userRepository.getUser({ id: data.id })
            .then(results => {
                user = results[0]
            }).catch(error => {
                console.log(error)
            })

        let response = {
            user: user,
            statusCode: 200
        }

        return response
    }

}

export { GetUserService }