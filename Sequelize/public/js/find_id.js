const idContainer=document.getElementById('show_id');
const search=document.getElementById('search');
search.addEventListener('submit',function(e){
    e.preventDefault()

    idContainer.innerText='';
    const formData = new FormData(this)
    const payload = {
        find_name: formData.get('find_name'),
        find_phone: formData.get('find_phone')
    }
    fetch('/api/id', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.length>0){
            for(let i=0; i<data.length; i++){
                const span=document.createElement('span')
                span.innerText=data[i].user_id;
                idContainer.appendChild(span);
                idContainer.appendChild(document.createElement('br'));
            }
        }
        else{
            idContainer.innerText='일치하는 계정 없음';
        }
    })
})