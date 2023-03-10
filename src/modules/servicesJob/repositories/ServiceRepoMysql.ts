import { Service } from "../model/Service";
import { ICreateServiceDTO, IGetServiceDTO, IServiceRepository, IGetServicesDTO, IChageStatusServiveDT, IUpdateServiceDTO } from "./IServiceRepository";
import { getConnection } from "../../../helpers/dbConnection";

const mysql = require('mysql2');
const db = getConnection()

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

class ServiceRepoMysql implements IServiceRepository {

    create({ architect_id, title, description, client_id }: ICreateServiceDTO): void {
        const service = new Service()

        Object.assign(service, {
            architect_id,
            client_id,
            title,
            description,
            status: 0,
            created_at: new Date()
        })

        connection.getConnection((err, connection) => {
            if (err) throw err;

            connection.query('INSERT INTO services SET ?', service, (err, result) => {
                if (err) throw err;
            });

            connection.release((err) => {
                if (err) throw err;
            });
        });
    }

    updateService({ title, id, description }: IUpdateServiceDTO) {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`UPDATE services SET title = "${title}", description = "${description}" WHERE id = ${id}`, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                    connection.release()
                });
            });
        })

    }

    getServices({ architect_id }: IGetServicesDTO) {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT services.*, users.name AS requester FROM services INNER JOIN users ON services.client_id = users.id WHERE architect_id = ${architect_id} ;`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result)
                        connection.release()
                    });
            });
        })

    }

    getServiceById({ id }: IGetServiceDTO) {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT * FROM services WHERE id = "${id}"`, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                    connection.release()
                });
            });
        })
    }

    getServiceByClientId({ id }: IGetServiceDTO) {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT services.*, users.name AS architectName FROM services INNER JOIN users ON services.architect_id = users.id WHERE client_id = ${id} ;`, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                    connection.release()
                });
            });
        })
    }

    changeStatusService({ id, status }: IChageStatusServiveDT) {

        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`UPDATE services SET status = ${status} WHERE id = "${id}"`, (err, result) => {
                    if (err) reject(err);
                    resolve(result)
                    connection.release()
                });
            });
        })
    }
}

export { ServiceRepoMysql }