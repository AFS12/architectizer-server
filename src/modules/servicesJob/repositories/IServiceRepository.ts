
interface ICreateServiceDTO {
    architect_id: number;
    client_id: number;
    title: string;
    description: string;
}

interface IUpdateServiceDTO {
    id: number;
    title: string;
    description: string;
}

interface IGetServicesDTO {
    architect_id: number
}

interface IGetServiceDTO {
    id: number
}

interface IGetServiceByClientIdDTO {
    id: number
}

interface IChageStatusServiveDT {
    id: number
    status: number
}

interface IServiceRepository {
    create({ architect_id, title, description, client_id }: ICreateServiceDTO): void
    getServices({ architect_id }: IGetServicesDTO): Promise
    getServiceById({ id }: IGetServiceDTO): Promise
    changeStatusService({ id, status }: IChageStatusServiveDT): Promise
    updateService({ title, id, description }: IUpdateServiceDTO): Promise
    getServiceByClientId({ id }: IGetServiceByClientIdDTO): promice
}

export { IServiceRepository, ICreateServiceDTO, IGetServiceDTO, IGetServicesDTO, IChageStatusServiveDT, IGetServiceByClientIdDTO, IUpdateServiceDTO }