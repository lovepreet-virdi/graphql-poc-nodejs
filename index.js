const express = require("express");
// const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const PORT = 3001;
const app = express();

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