import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

// Database Connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database connected')
    app.listen(config.port, () => {
      console.log(`Server started at http://localhost:${config.port}`)
    })
  } catch (error) {
    console.log('Database connection failed', error)
  }
}
bootstrap()
