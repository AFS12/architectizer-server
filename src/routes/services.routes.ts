import { Router } from "express";
import { ServiceRepoMysql } from "../modules/servicesJob/repositories/ServiceRepoMysql";
import { ChangeServiceStatusService } from "../modules/servicesJob/services/ChangeServiceStatusService";
import { CreateServiceService } from "../modules/servicesJob/services/CreateServiceService";
import { GetServicesByClienteIdService } from "../modules/servicesJob/services/GetServicesByClienteIdService";
import { GetServicesService } from "../modules/servicesJob/services/GetServicesService";
import { UpdateServiceService } from "../modules/servicesJob/services/UpdateServiceService";

const servicesRoutes = Router()
const serviceRepository = new ServiceRepoMysql()

servicesRoutes.post('/', (request, response) => {

    const { architect_id, client_id, title, description } = request.body

    const createServiceService = new CreateServiceService(serviceRepository)

    const responseStatus = createServiceService.execute({ architect_id, client_id, title, description })

    return response.status(responseStatus.statusCode).json(responseStatus.message)
})

servicesRoutes.put('/', (request, response) => {

    const { status, id } = request.body

    const changeServiceStatusService = new ChangeServiceStatusService(serviceRepository)

    const responseStatus = changeServiceStatusService.execute({ status, id })

    return response.status(responseStatus.statusCode).json(responseStatus.message)
})

servicesRoutes.put('/update', (request, response) => {

    const { title, id, description } = request.body

    const updateServiceService = new UpdateServiceService(serviceRepository)

    const responseStatus = updateServiceService.execute({ title, id, description })

    return response.status(responseStatus.statusCode).json(responseStatus.message)
})

servicesRoutes.get('/:id', async (request, response) => {
    const architect_id = parseInt(request.params.id)
    const getServicesService = new GetServicesService(serviceRepository)

    const responseStatus = await getServicesService.execute({ architect_id })

    return response.status(responseStatus.statusCode).json(responseStatus)
})

servicesRoutes.get('/byclientid/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const getServicesByClienteIdService = new GetServicesByClienteIdService(serviceRepository)

    const responseStatus = await getServicesByClienteIdService.execute({ id })

    return response.status(responseStatus.statusCode).json(responseStatus)
})

export { servicesRoutes }