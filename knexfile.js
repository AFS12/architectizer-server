module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'b12815f7',
        database: 'architectize',
        port: '3309',
      },
      migrations: {
        directory: './migrations'
      }
    }
  }
  