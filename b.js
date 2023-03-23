const express = require('express')
const app = express()
app.get("/bar", (_, res) => {
  res.send(`<div>BAR</div>`).end()
})

app.listen(8888, () => console.log('Listening'))
