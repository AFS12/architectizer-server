import Connection from "mysql2/typings/mysql/lib/Connection";
import { Architect } from "../model/architect";
import { IArchitectRepository, ICreateArchitectDTO } from './IArchitectRepository'

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

class ArchitectRepoMysql implements IArchitectRepository {

    async create({ name, email, password, phone, gender, age }: ICreateArchitectDTO): void {
        const architect = new Architect()

        const passwordHash = await bcrypt.hash(password, saltRounds);

        Object.assign(architect, {
            name,
            email,
            password: passwordHash,
            phone,
            gender,
            age,
            created_at: new Date()
        })

        connection.getConnection((err, connection) => {
            if (err) throw err;
            console.log('Conectado ao banco de dados MySQL!');

            connection.query('INSERT INTO architects SET ?', architect, (err, result) => {
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

export { ArchitectRepoMysql }