const prompt = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const gallery = document.getElementById("gallery");
const imageCount = document.getElementById("imageCount");
const aspectRatio = document.getElementById("aspectRatio");

generateBtn.addEventListener("click", generateImages);

function getSize() {

    switch (aspectRatio.value) {

        case "portrait":
            return {
                width: 768,
                height: 1024
            };

        case "landscape":
            return {
                width: 1024,
                height: 768
            };

        default:
            return {
                width: 768,
                height: 768
            };

    }

}

async function generateImages() {

    const text = prompt.value.trim();

    if (!text) {

        alert("Please enter a prompt.");

        return;

    }

    gallery.innerHTML = "";

    generateBtn.disabled = true;

    generateBtn.innerHTML =
    `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;

    const count = Number(imageCount.value);

    const size = getSize();

    for (let i = 0; i < count; i++) {

        const card = document.createElement("div");

        card.className = "image-card";

        card.innerHTML =
        `<div class="loader"></div>`;

        gallery.appendChild(card);

        const seed = Math.floor(Math.random() * 99999999);

        const image = document.createElement("img");

        image.src =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(text)}?width=${size.width}&height=${size.height}&seed=${seed}`;

        image.onload = () => {

            card.innerHTML = "";

            card.appendChild(image);

            const download = document.createElement("a");

            download.href = image.src;

            download.target = "_blank";

            download.className = "download";

            download.innerHTML =
            `<i class="fa-solid fa-download"></i>`;

            card.appendChild(download);

        };

        image.onerror = () => {

            card.innerHTML =
            "<p>Image Failed</p>";

        };

    }

    generateBtn.disabled = false;

    generateBtn.innerHTML =
    `<i class="fa-solid fa-bolt"></i> Generate Images`;

}
//==========================
// Image Preview
//==========================

const preview = document.getElementById("preview");

const previewImg = document.getElementById("previewImg");

const closePreview = document.getElementById("closePreview");

gallery.addEventListener("click",(e)=>{

if(e.target.tagName==="IMG"){

preview.style.display="flex";

previewImg.src=e.target.src;

}

});

closePreview.addEventListener("click",()=>{

preview.style.display="none";

});

preview.addEventListener("click",(e)=>{

if(e.target===preview){

preview.style.display="none";

}

});