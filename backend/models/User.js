import { DataTypes } from "sequelize";
import sequelize from "../config/Sequelize.js";
import bcrypt from "bcrypt";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.getAll = async () => {
  const users = User.findAll();

  return users;
};

User.getByUsername = async (username) => {
  try {
    const specificUser = await User.findOne({ where: { username } });

    return specificUser;
  } catch (error) {
    throw error;
  }
};

User.registerUser = async (body) => {
  const { password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username: body.username,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

User.login = async (body) => {
  const { username, password } = body;

  try {
    const user = await User.getByUsername(username);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return null;

    return user;
  } catch (error) {
    console.log(error);
  }
};

User.removeUser = async (id) => {
  try {
    User.destroy({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};

export default User;
