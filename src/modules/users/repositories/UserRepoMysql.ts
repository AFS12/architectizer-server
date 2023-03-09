import { User } from "../model/User";
import { IUserRepository, ICreateUserDTO, ILoginDTO, IGetUserDTO } from './IUserRepository'

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

            connection.query('INSERT INTO users SET ?', user, (err, result) => {
                if (err) throw err;
            });

            connection.release((err) => {
                if (err) throw err;
            });
        });
    }

    async login({ email }: ILoginDTO): Promise {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT * FROM users WHERE email = "${email}"`, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                    connection.release()
                });
            });
        })
    }


    getUser({ id }: IGetUserDTO) {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT * FROM users WHERE id = "${id}"`, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                    connection.release()
                });
            });
        })
    }
}

export { UserRepoMysql }