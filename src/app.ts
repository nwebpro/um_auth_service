import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app:Application = express()

// Cors
app.use(cors())
// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
app.get('/', (req:Request, res:Response) => {
    res.send('Working Successfully')
})

export default app