const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = graphql;
const Books = [
    { name: "Book 1", id: "1", genre: "comedy", authorId: "2" },
    { name: "Book 2", id: "2", genre: "thriller", authorId: "3" },
    { name: "Book 3", id: "3", genre: "action", authorId: "1" }
];
const Authors = [
    { name: "Author 1", id: "1", age: 45 },
    { name: "Author 2", id: "2", age: 67 },
    { name: "Author 3", id: "3", age: 34 }
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent) => {
                return Authors.find((author) => author.id === parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent) => {
                return Books.filter((book) => book.authorId === parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(args) {
                //db query part goes here
                return Books.find((book) => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                return Authors.find((author) => author.id === args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});