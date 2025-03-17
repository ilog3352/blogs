## Express 基本使用
```sh
npm install express
```

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000)
```