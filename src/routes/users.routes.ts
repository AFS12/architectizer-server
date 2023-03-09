import { Router } from "express";
import { UserRepoMysql } from "../modules/architects/repositories/UserRepoMysql";
import { CreateUserService } from "../modules/architects/services/CreateUserService";
import { LoginUserService } from "../modules/architects/services/LoginUserService";
import { GetUserService } from "../modules/architects/services/GetUserService";


const usersRoutes = Router()
const userRepository = new UserRepoMysql()

usersRoutes.post('/', (request, response) => {
    const { name, email, password, phone, gender, age, type } = request.body

    const createUserService = new CreateUserService(userRepository)

    const responseStatus = createUserService.execute({ name, email, password, phone, gender, age, type })

    return response.status(responseStatus.statusCode).json(responseStatus.message)
})

usersRoutes.post('/login', async (request, response) => {
    const { email, password } = request.body

    const loginUserService = new LoginUserService(userRepository)

    const responseStatus = await loginUserService.execute({ email, password })

    return response.status(responseStatus.statusCode).json(responseStatus)
})

usersRoutes.get('/userdata/:token', async (request, response) => {
    const token = request.params.token

    const getUserService = new GetUserService(userRepository)

    const responseStatus = await getUserService.execute({ token })

    return response.status(responseStatus.statusCode).json(responseStatus)
})

export { usersRoutes }