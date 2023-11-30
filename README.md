# POC Backend

This repo is a next.js project - Its pretty basic with just the components to build a POC of a eth auth pattern. Its more of a test client to prove an api, kind of.

### Docs

You can find swagger docs for the api at the route, i.e.
`https://api.tixtix.net/`

You can find monitoring for the application here:
`https://api.tixtix.net/stats`

### Installing

I use nvm to keep node versions inline. You can install it here: https://github.com/nvm-sh/nvm

To get started, run:

- `nvm use`
- `npm i`

### Running in dev

`npm run start:dev`
This starts the project up in dev mode, with hot reloading. No need to restart the server to see changes.

> By default the app runs on `http://localhost:3001`

### Database

The api uses sqlite and prisma. Database schemas are defined in the prisma schema. Database changes can be migrated from schema to the database by running: `npx prisma migrate dev --name init`

New prisma clients by `npx prisma generate`

prisma docs: `https://www.prisma.io`
