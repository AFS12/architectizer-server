# architectizer-server

## Project setup
```
npm install
```

### Set Database connections on files ./kenexfile.js and ./src/helpers/dbConnection.ts
### Database used is MYSQL

### After this, run migration command
```
npx knex migrate:latest
```

### Run project
```
npm run dev
```

## Other commands

### down tables
```
npx knex migrate:down
```
