import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/view.js'
import { Server } from 'socket.io'
import __dirname from './util.js'
import path from 'path'

// constantes
const PORT = 8080

// caminhos
const viewsPath = path.join(__dirname, 'views')
const publicPath = path.join(__dirname, 'public')

// inicializacao do servidor
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', viewsPath)

// routes
app.use('/', viewsRouter)

app.use(express.static(publicPath))
// routes
// app.use('/api')

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço:\nhttp://localhost:${PORT}/`)
})

const io = new Server(httpServer)

let messages = []

io.on('connection', (socket) => {
    console.log('Cliente conectado')

    socket.on('message', (data) => {
        console.log('Mensagem recebida:\n', data);
        messages.push(data)
        io.emit('messageLogs', messages)
    })
})

