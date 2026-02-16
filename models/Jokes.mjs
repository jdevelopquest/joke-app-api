import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/jokes.sqlite'
});

class Jokes extends Model {
}

Jokes.init(
    {
        joke: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Jokes',
    },
);

await Jokes.sync()
    .then(r => console.log('Jokes table synced.'))
    .catch(err => console.error(err));

export default Jokes;