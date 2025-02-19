import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface ProfileAttributes {
  id: number;
  bio: string;
  userId: number;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {}

export class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: number;
  public bio!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function ProfileFactory(sequelize: Sequelize): typeof Profile {
  Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'profiles',
      sequelize,
    }
  );

  return Profile;
}