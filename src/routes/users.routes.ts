import { Router } from "express";
import { UserRepoMysql } from "../modules/architects/repositories/UserRepoMysql";
import { CreateUserService } from "../modules/architects/services/CreateUserService";

const usersRoutes = Router()
const userRepository = new UserRepoMysql()

usersRoutes.post('/', (request, response) => {
    const { name, email, password, phone, gender, age, type } = request.body

    const createUserService = new CreateUserService(userRepository)

    const responseStatus = createUserService.execute({ name, email, password, phone, gender, age, type })

    return response.status(responseStatus.statusCode).json(responseStatus.message)
})

usersRoutes.get('/', (request, response) => {
    return response.status(201).json('Teste')
})

export { usersRoutes }