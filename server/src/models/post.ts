import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface PostAttributes {
  id: number;
  content: string;
  userId: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: number;
  public content!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function PostFactory(sequelize: Sequelize): typeof Post {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'posts',
      sequelize,
    }
  );

  return Post;
}