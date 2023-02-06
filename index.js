const express = require("express");
// const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const PORT = 3001;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/graphqlpoc');
mongoose.connection.once("open", ()=> {
    console.log("db connection successful");
})

// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))


// app.get("/", (req, res) => {
//     res.send({ message: "hello" }).status(200);
// })

app.listen(PORT, () => {
    console.log(`server listening for requests on port:${PORT}`);
})