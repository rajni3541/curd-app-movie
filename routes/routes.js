const express = require('express')
const router = express.Router()
const Controller = require('../controller/movie')

const cors = require('cors')


router.get('/',Controller.showIndex) 

router.post('/add-movie',cors(), Controller.addMovie)

router.get('/get-movie/:key',cors(), Controller.showmovie)

router.put('/update-movie/:id',cors(), Controller.updateMovie)

router.delete('/delete-movie/:id' ,cors(),Controller.deletemovie)

module.exports = router;