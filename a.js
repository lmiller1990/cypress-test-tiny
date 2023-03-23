const express = require('express')
const app = express()
app.get("/foo", (_, res) => {
  res.send(`<div>FOO</div>`).end()
})

app.listen(7777, () => console.log('Listening'))
