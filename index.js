const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/abracadabra/usuarios', (req, res) => {
const users = fs.readFileSync('usuarios.json', 'utf8')
    res.send(users)
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const user = req.params.usuario
    const names = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'))
    
    const usuario = names.usuarios.find((elemento) => {
        return elemento === user
    }) 

    usuario === user 
        ? next()
        : res.sendFile(__dirname + '/assets/who.jpeg')
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
    const user = req.params.usuario

    res.send(`<center><h1>El usuario ${user} si existe</h1><center>`)
})

app.get('/abracadabra/conejo/:n', (req, res, next) => {
    const numero = Math.floor(Math.random() * (4 - 1)) + 1
    //console.log(numero)
    const n = req.params.n
    //console.log(n)

    numero == n
        ? next()
        : res.sendFile(__dirname + '/assets/voldemort.jpg')
})

app.get('/abracadabra/conejo/:n', (req, res) => {
    res.sendFile(__dirname + '/assets/conejito.jpg')
})

app.use(express.static('assets'))

app.listen(3000, () => {
    console.log('Server ON')
})

app.get('*', (req, res) => {
    res.send('<center><h1>Esta pagina no existe</h1><center>')
})