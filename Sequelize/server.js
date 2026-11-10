const {MySQL}=require('./app.js')
const {Posts}=require('./post.js')

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/public/index.html');
});

app.post('/',async(req,res)=>{
    const userId=req.body.id;
    const userPw=req.body.pw;
    console.log(`아이디 : ${userId}, 비밀번호 : ${userPw}`)

    const mysql=new MySQL();
    const result=await mysql.selectQuery(userId,userPw);
    if(result){
        res.send("<script>alert('로그인 성공'); location.href='/main';</script>")
    } else{
        res.send("<script>alert('로그인 실패'); location.href='/'</script>;")
    }
})

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/public/register.html')
})

app.post('/register',async(req,res)=>{
    const userId=req.body.id;
    const userPw=req.body.pw;
    const userName=req.body.userName;
    const userPhone=req.body.phone;
    console.log(`아이디 : ${userId}, 비밀번호 : ${userPw}`)

    const mysql=new MySQL();
    await mysql.insertQuery(userId,userPw,userName,userPhone);

    res.send("<script>alert('회원가입 성공'); location.href='/';</script>")
})

app.get('/findId',(req,res)=>{
    res.sendFile(__dirname+'/public/find_id.html');
})

app.post('/api/id',async(req,res)=>{
    const findName=req.body.find_name;
    const findPhone=req.body.find_phone;

    const mysql=new MySQL();
    const result=await mysql.selectId(findName,findPhone)
    res.json(result);
})

app.get('/main',(req,res)=>{
    res.sendFile(__dirname+'/public/main.html')
})

app.get('/api/posts',async (req,res)=>{
    try{
        const posts=new Posts();
        const result=await posts.selectQuery();
        res.json(result);
    } catch(error){
        console.error(error);
        res.send('오류')
    }
})

app.get('/write',(req,res)=>{
    res.sendFile(__dirname+'/public/write.html');
})

app.post('/write',(req,res)=>{
    try{
        const title=req.body.title;
        const content=req.body.content;

        const posts=new Posts();
        posts.insertQuery(title,content);
        res.send('<script>alert("저장 완료"); location.href="/main";</script>')
    } catch(error){console.error(error)};
})

app.get('/mypage',(req,res)=>{
    res.sendFile(__dirname+'/public/mypage.html');
})

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
