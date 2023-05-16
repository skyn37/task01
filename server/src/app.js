const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require('./gql/typeDefs/typeDefs');
const { resolvers } = require('./gql/resolvers/resolvers');
const db = require('./db');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
        console.error(err);
        return err;
      },
});

db.sequelize.sync()
    .then(() => {
        console.log('Connection to the database has been established successfully.');

        startStandaloneServer(server).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    })
    .catch((err) => {
        console.log(err)
        console.error('Unable to connect to the database:', err);
    });