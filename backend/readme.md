# Play and Tweet Backend

Minimal Node.js + Express API for creating, listing, liking, and deleting short tweet-style posts.

## Features
- CRUD for tweets
- Like endpoint
- Basic validation & error responses (JSON)
- Environment-based config
- Test-ready (Mocha/Chai or Jest)
- Pluggable persistence (MongoDB or in-memory)

## Stack
Node.js, Express, (MongoDB optional), dotenv, nodemon, ESLint, Prettier, Supertest.

## Requirements
- Node.js 18+
- npm or yarn
- (Optional) MongoDB instance

## Quick Start
```bash
git clone <repo-url>
cd play-and-tweet/backend
cp .env.example .env
npm install
npm run dev
```

## .env Example
PORT=3000  
MONGODB_URI=mongodb://localhost:27017/play-and-tweet  
LOG_LEVEL=info  
JWT_SECRET=replace_me  

## Scripts
- dev: nodemon server
- start: production start
- test: run test suite
- lint: ESLint
- fmt: Prettier format

## API (planned)
GET /api/tweets  
POST /api/tweets  
GET /api/tweets/:id  
PATCH /api/tweets/:id/like  
DELETE /api/tweets/:id  

### Sample Create
```bash
curl -X POST http://localhost:3000/api/tweets \
    -H "Content-Type: application/json" \
    -d '{"text":"Hello world"}'
```

## Structure
```
src/
    app.js
    server.js
    config/
    routes/
    controllers/
    models/
    middleware/
    tests/
```

## Testing
```bash
npm i -D mocha chai supertest
npm test
```

## Roadmap
- Rate limiting
- JWT auth
- OpenAPI/Swagger
- Docker + CI
- Production logging

## Contributing
Fork → branch → commit → PR.

## License
MIT (add LICENSE file).

Happy building.
