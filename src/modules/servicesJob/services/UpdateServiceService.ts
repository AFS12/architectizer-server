import { IServiceRepository } from '../repositories/IServiceRepository'

interface IRequest {
    id: number;
    title: string;
    description: string;
}

class UpdateServiceService {

    constructor(private serviceRepository: IServiceRepository) { }

    execute({ title, id, description }: IRequest) {

        this.serviceRepository.updateService({ title, id, description })

        let response = {
            message: 'Serviço atualizado com sucesso ',
            statusCode: 200
        }

        return response
    }
}

export { UpdateServiceService }