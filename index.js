const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const req_user = 'user_id'

const upload = multer({
  dest: './images'
})

app.post('/upload/', upload.single("namefile"), (req, res) => {

  // Aqui obtens el Objectid del pare. I guardes la imatge amb aquest nom.
  const tempPath = req.file.path
  const targetPath = path.join(__dirname, `./images/${req_user}.png`)

  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, err => {
      if (err) res.json({ err })
      else res.json({ res: 'ok' })
    })
  } else {
    res.json({ res: 'error' })
    console.log(path.extname(req.file.originalname).toLowerCase())
  }
})

app.get("/image", (req, res) => {
  // Aqui verifiques el auth token i obtens el id del usuari per obtenir el document
  res.sendFile(path.join(__dirname, `./images/${req_user}.png`))
})

app.use('/', express.static('./static'))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
