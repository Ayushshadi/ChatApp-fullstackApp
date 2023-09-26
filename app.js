const express = require('express');
const path = require('path');
require('dotenv').config();

const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const sequelize = require('./utils/database');
const cors = require('cors');
const Message = require('./models/messageModel');
const User = require('./models/userModel');
const Group = require('./models/groupModel');
const UserGroup = require('./models/userGroup');

const cron=require('./cron')
cron.cronjob;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/signup', signupRoutes)
app.use('/login', loginRoutes)
app.use('/user', userRoutes)
app.use('/message', messageRoutes);
app.use('/group', groupRoutes);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

User.belongsToMany(Group,{as:'Team',through:'GroupAdmin',timestamps:false})
Group.belongsToMany(User,{as:'Admin',through:'GroupAdmin',timestamps:false})

Group.hasMany(Message);
Message.belongsTo(Group);

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' })

sequelize.sync({ force:false })
    .then(res => console.log(`database connected`))
    .catch(err => console.log(`error while database connection`));
app.listen(3000, () => console.log(`listing on port 3000`));