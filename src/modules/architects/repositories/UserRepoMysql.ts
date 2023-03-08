import Connection from "mysql2/typings/mysql/lib/Connection";
import { User } from "../model/User";
import { IUserRepository, ICreateUserDTO } from './IUserRepository'

const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'b12815f7',
    database: 'architectize',
    port: '3309',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

class UserRepoMysql implements IUserRepository {

    async create({ name, email, password, phone, gender, age, type }: ICreateUserDTO): Promise<void> {
        const user = new User()

        const passwordHash = await bcrypt.hash(password, saltRounds);

        Object.assign(user, {
            name,
            email,
            password: passwordHash,
            phone,
            gender,
            age,
            type,
            created_at: new Date()
        })

        connection.getConnection((err, connection) => {
            if (err) throw err;
            console.log('Conectado ao banco de dados MySQL!');

            connection.query('INSERT INTO users SET ?', user, (err, result) => {
                if (err) throw err;
                console.log('Dados inseridos no banco de dados!');
            });

            connection.release((err) => {
                if (err) throw err;
                console.log('Conexão com o banco de dados encerrada!');
            });
        });

    }
}

export { UserRepoMysql }