const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = graphql;

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent) => {
                const book = new Book();
                return book.find({authorId: parent.id})
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: (parent) => {
                const author = new Author();
                return author.findById(parent.authorId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                //db query part goes here
                const book = new Book();
                return book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                const author = new Author();
                return author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType)
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});