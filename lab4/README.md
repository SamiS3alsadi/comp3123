# COMP3123 - exec04 (Express JS)

Student: Sami Al-Sadi (101571952)

## Run

```
npm install
npm run dev     # nodemon, auto-restart
npm start       # plain node
```

Server listens on http://localhost:3000

## Endpoints

| Method | Route | Notes |
|---|---|---|
| GET | `/hello` | returns `Hello Express JS` as plain text |
| GET | `/user?firstname=&lastname=` | query params; defaults to Pritesh / Patel |
| POST | `/user/:firstname/:lastname` | path params |
| POST | `/users` | JSON array of `{ firstname, lastname }` |

## Static middleware

`express.static("public")` serves `public/instruction.html` at
http://localhost:3000/instruction.html
