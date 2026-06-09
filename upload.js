const API_URL = "https://tourl-five.vercel.app/api/upload";

async function upload(){
    let file = document.getElementById("file").files[0];
    if(!file) return alert("pilih file dulu");

    let result = document.getElementById("result");
    result.innerText = "uploading...";

    let form = new FormData();
    form.append("file", file);

    try{
        let res = await fetch(API_URL, {
            method:"POST",
            body:form
        });

        let data = await res.json();

        if(data.raw){
            result.innerHTML = `
RAW LINK:<br>
<code>${data.raw}</code>

<br><br>
<img src="${data.raw}" width="100%">
            `;
        } else {
            result.innerText = "gagal upload";
        }

    } catch(e){
        result.innerText = "server error";
    }
}
