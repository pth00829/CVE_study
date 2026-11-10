require('dotenv').config();
const host=process.env.DB_HOST;
const user=process.env.DB_USER;
const pw=process.env.DB_PASSWORD;
const db_name=process.env.DB_NAME;

const {Sequelize, DataTypes, QueryTypes, literal, Op}=require('sequelize');
const sequelize=new Sequelize(db_name, user, pw,{
    host:host,
    dialect:'mysql',
    logging: false
})

const Post=sequelize.define('Post',{
    post_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},{tableName:'posts',timestamps:false});

class Posts{
    constructor(){
        this.createTable();
    }

    async createTable(){
        try{
            await sequelize.sync();
            console.log("SUCCESS")
        } catch(error){console.error(error)};
    }

    async selectQuery(){
        const posts=await Post.findAll({});
        return posts;
    }

    async insertQuery(title, content){
        await sequelize.query(
            'INSERT INTO posts(title, content) VALUES(:title, :content);',
            {
                replacements:{title:title, content:content},
                type:QueryTypes.INSERT
            }
        )
    }
}

module.exports={Posts};