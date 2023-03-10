function getConnection() {

    const db = {
        host: '127.0.0.1',
        user: 'root',
        password: 'b12815f7',
        database: 'architectize',
        port: '3309',
    }

    return db
}

export { getConnection }