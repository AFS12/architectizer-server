import { IServiceRepository } from '../repositories/IServiceRepository'

interface IRequest {
    id: number;
}

class GetServicesByClienteIdService {

    constructor(private serviceRepository: IServiceRepository) { }

    async execute({ id }: IRequest) {

        let services: object[]

        await this.serviceRepository.getServiceByClientId({ id: id })
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

export { GetServicesByClienteIdService }