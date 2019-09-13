import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';
import { Sequelize, DataTypes } from 'sequelize';
import User from './user';

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'blaise2s',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'gqlpgsequelizets',
    // ssl: true,
    // dialectOptions: {
    //     "ssl": { "require": true }
    // }
})

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        freezeTableName: true,
        tableName: "Users"
    }
);
User.sync({ force: false });

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString }
    }
})

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.findAll().then(users => users);
            }
        }
    }
});

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutatin',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString }
            },
            resolve(_parentValue, { firstName, lastName, address }) {
                return User.create({
                    firstName,
                    lastName,
                    address
                }).then(user => user);
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});
