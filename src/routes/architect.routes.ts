import { Router } from "express";
import { ArchitectRepoMysql } from "../modules/architects/repositories/ArchitectRepoMysql";
import { CreateArchitectService } from "../modules/architects/services/CreateArchitectService";

const architectRoutes = Router()
const architectRepository = new ArchitectRepoMysql()

architectRoutes.post('/', (request, response) => {
    const { name, email, password, phone, gender, age } = request.body

    const createArchitectService = new CreateArchitectService(architectRepository)

    const responseStatus = createArchitectService.execute({ name, email, password, phone, gender, age })

    return response.status(responseStatus.statusCode).json(responseStatus.message)
})

architectRoutes.get('/', (request, response) => {
    return response.status(201).json('Teste')
})

export { architectRoutes }