function main() {
    const image_input = document.querySelector("#img_input");
    const form = document.querySelector("#myform");
    const pred = document.querySelector('.pred');
    let uploaded_img = "";

    image_input.addEventListener("change", function(){
         const reader = new FileReader();
         reader.addEventListener("load", () => {
            uploaded_img = reader.result;
            document.querySelector(".display_image").style.backgroundImage = "url(" + uploaded_img+")";
         })
         reader.readAsDataURL(this.files[0])
    })

    form.addEventListener("submit", e => {
        e.preventDefault();
        const image = image_input.files[0]
        if(image.type == "image/png" || image.type == "image/jpeg" || image.type == "image/jpg" ){
            let size = parseFloat(image.size / (1024*1024)).toFixed(2);
            if(size<=4){
                formdata = new FormData(form);
                ajax({
                    url: "https://gemsapi-d7s57.ondigitalocean.app/image",
                    method: "POST",
                    data: formdata,
                    onsuccess: (responseText, status, statusText)=>{
                        var data = JSON.parse(responseText);
                        pred.innerHTML = data['pred'];
                    },
                    onfailure: (status, statusText)=>{
                        pred.innerHTML = `<p>Status : ${status}</p> <p>${statusText}</p>`
                    },
                    contentType: false,
                });
            }else{
                pred.innerHTML = "Image size must be less than 4 mb";
            }
        }else{
            pred.innerHTML = "Image type not supported";
        }
    })

}

window.addEventListener('DOMContentLoaded', main);