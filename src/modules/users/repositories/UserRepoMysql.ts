import { User } from "../model/User";
import { IUserRepository, ICreateUserDTO, ILoginDTO, IGetUserDTO } from './IUserRepository'
import { getConnection } from "../../../helpers/dbConnection";

const mysql = require('mysql2');
const db = getConnection()
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port,
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


    getArchitects() {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT * FROM users WHERE type = 1`, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                    connection.release()
                });
            });
        })
    }
}

export { UserRepoMysql }