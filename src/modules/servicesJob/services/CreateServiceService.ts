import { IServiceRepository } from '../repositories/IServiceRepository'

interface IRequest {
    architect_id: number;
    client_id: number;
    title: string;
    description: string;
}

class CreateServiceService {

    constructor(private serviceRepository: IServiceRepository) { }

    execute({ architect_id, title, description, client_id }: IRequest) {

        this.serviceRepository.create({ architect_id, description, title, client_id })

        let response = {
            message: 'Solicitação criada com sucesso',
            statusCode: 201
        }

        return response
    }
}

export { CreateServiceService }