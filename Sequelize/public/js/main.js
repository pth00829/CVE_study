document.getElementById('write').addEventListener('click',function(){
    location.href='/write';
})
document.getElementById('my_page').addEventListener('click',function(){
    location.href='/my_page';
})

async function loadPosts(){
    try{
        const response=await fetch('/api/posts');
        const result=await response.json();

        const postContainer=document.getElementById('posts');

        for(let i=0; i<result.length; i++){
            let title=result[i].title;
            let post_id=result[i].post_id;

            var a=document.createElement('a');
            a.innerText=post_id+":"+title;
            postContainer.appendChild(a);
            postContainer.appendChild(document.createElement('br'));
        }
    } catch(error){
        console.error(error)
    }
}

loadPosts();