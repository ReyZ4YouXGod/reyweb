const drop = document.getElementById("drop");
const fileInput = document.getElementById("file");
const bar = document.getElementById("bar");
const result = document.getElementById("result");

let selectedFile = null;

// click to select
drop.onclick = () => fileInput.click();

fileInput.onchange = () => {
    selectedFile = fileInput.files[0];
    result.innerText = selectedFile.name;
};

// drag & drop
drop.addEventListener("dragover", e => {
    e.preventDefault();
    drop.classList.add("dragover");
});

drop.addEventListener("dragleave", () => {
    drop.classList.remove("dragover");
});

drop.addEventListener("drop", e => {
    e.preventDefault();
    drop.classList.remove("dragover");

    selectedFile = e.dataTransfer.files[0];
    result.innerText = selectedFile.name;
});

// upload
async function uploadFile() {
    if(!selectedFile) return alert("File belum dipilih");

    let form = new FormData();
    form.append("file", selectedFile);

    result.innerText = "Uploading...";
    bar.style.width = "20%";

    try {
        let res = await fetch("upload.php", {
            method: "POST",
            body: form
        });

        bar.style.width = "70%";

        let data = await res.json();

        bar.style.width = "100%";

        if(data.link){
            result.innerHTML = `
                <p>Success!</p>
                <a href="${data.link}" target="_blank">${data.link}</a>
            `;

            navigator.clipboard.writeText(data.link);
        } else {
            result.innerText = "Upload gagal";
        }

    } catch(err){
        result.innerText = "Server error";
        bar.style.width = "0%";
    }
}
