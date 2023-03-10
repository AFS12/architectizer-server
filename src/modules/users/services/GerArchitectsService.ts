import { IUserRepository } from "../repositories/IUserRepository";

class GerArchitectsService {
    constructor(private userRepository: IUserRepository) { }

    async execute() {

        let architects: object[] = []

        await this.userRepository.getArchitects()
            .then(results => {
                architects = results
            }).catch(error => {
                console.log(error)
            })

        let response = {
            architects: architects,
            statusCode: 200
        }

        return response
    }

}

export { GerArchitectsService }