import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// Application route import
import UserRouter from './app/modules/Users/Users.route'

// Middleware
app.use(cors())
// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', UserRouter)

// Testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
