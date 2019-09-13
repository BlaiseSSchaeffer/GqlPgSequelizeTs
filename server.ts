import * as express from 'express';
import * as expressGraphQL from 'express-graphql';
import schema from './schema/schema';

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(4003, () => {
    console.log('Listening...');
});
