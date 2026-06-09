async function uploadFile() {
    let file = document.getElementById("file").files[0];
    if(!file) return alert("Pilih file dulu");

    let result = document.getElementById("result");
    result.innerText = "Uploading...";

    let form = new FormData();
    form.append("file", file);

    try {
        let res = await fetch("/api/upload", {
            method: "POST",
            body: form
        });

        let data = await res.json();

        if(data.link){
            result.innerHTML = `
                <p>Success:</p>
                <a href="${data.link}" target="_blank">${data.link}</a>
            `;

            navigator.clipboard.writeText(data.link);
        } else {
            result.innerText = "Upload gagal";
        }

    } catch(err){
        result.innerText = "Server error";
    }
}
