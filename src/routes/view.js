import { Router as ExpressRouter } from 'express'

const router = new ExpressRouter()

router.get('/', (_, response) => {
    console.log('carregou')
    // codigo aqui
    response.render('index', {
        title: 'Coderhouse',
    })
})

export default router