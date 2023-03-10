import { IServiceRepository } from '../repositories/IServiceRepository'

interface IRequest {
    status: number;
    id: number
}

class ChangeServiceStatusService {

    constructor(private serviceRepository: IServiceRepository) { }

    execute({ status, id }: IRequest) {

        this.serviceRepository.changeStatusService({ status, id })

        let response = {
            message: 'Atualização Concluida ',
            statusCode: 200
        }

        return response
    }
}

export { ChangeServiceStatusService }