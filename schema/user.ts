import { Model } from 'sequelize';

class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public address!: string | null;
}

export default User;