require('dotenv').config();

const host=process.env.DB_HOST;
const user=process.env.DB_USER;
const pw=process.env.DB_PASSWORD;
const db_name=process.env.DB_NAME;

const {Sequelize, DataTypes, QueryTypes, literal, and, update}=require('sequelize');

const sequelize=new Sequelize(db_name, user, pw, {
  host:host,
  dialect:'mysql',
  logging: false
})

const User=sequelize.define('User',{
  user_id:{
    type:DataTypes.STRING,
    primaryKey:true
  },
  user_pw:{
    type:DataTypes.STRING,
    allowNull:false
  },
  user_name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  user_phone:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{tableName:'users', timestamps: false});

class MySQL{
  constructor(){
    this.createTable()
  }

  async createTable(){
    try{
      await sequelize.sync();
      console.log("생성 완료");
    } catch(error){console.error(error);}
  }

  async selectQuery(user_id, user_pw){
    const users=await User.findAll({
      where: and(literal("user_id=:user_id"),{user_pw}),
      replacements:{
        user_id:user_id
      }
    });
    if(users.length>0){
      return true;
    } else{
      return false;
    }
  }
  async insertQuery(user_id,user_pw,user_name,user_phone){
    await sequelize.query(
      'INSERT INTO users(user_id, user_pw, user_name, user_phone) VALUES (:user_id, :user_pw, :user_name, :user_phone);'
      ,{
        replacements: {user_id:user_id, user_pw:user_pw, user_name:user_name, user_phone:user_phone},
        type: QueryTypes.INSERT
      }
    );
  }
  async selectId(user_name, user_phone){
    const users=await User.findAll({
      attributes: ['user_id'],
      where:and({user_phone},literal("user_name=:user_name")),
      replacements:{
        user_name:user_name
      }
    });
    return users;
  }
}
module.exports={MySQL}