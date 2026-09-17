import Express = require("express");
import logger = require("./middleware/logger");
import loggerMidddleware = require("./middleware/logger");
import bodyParser = require("body-parser");

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.json())

app.use(loggerMidddleware)

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})