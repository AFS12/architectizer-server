import { IServiceRepository } from '../repositories/IServiceRepository'

interface IRequest {
    architect_id: number;
}

class GetServicesService {

    constructor(private serviceRepository: IServiceRepository) { }

    async execute({ architect_id }: IRequest) {

        let services: object[]

        await this.serviceRepository.getServices({ architect_id: architect_id })
            .then(results => {
                services = results
            }).catch(error => {
                console.log(error)
            })


        let response = {
            services: services,
            statusCode: 200
        }

        return response
    }
}

export { GetServicesService }