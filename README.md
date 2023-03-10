# architectizer-server

## Project setup
```
npm install
```

### Set Data base connections on files ./kenexfile.js and ./src/helpers/dbConnection.ts

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