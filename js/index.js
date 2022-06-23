let popAlert = (alert, message, classAdd) =>{
    alert.style.display = 'block';
    alert.setAttribute("class", `alert alert-dismissible fade show ${classAdd}`);
    alert.querySelector(".message").innerHTML = message;
    alert.querySelector("button").addEventListener("click", function(e) {
        this.parentElement.style.display= "none";
    })
}

let progressBar = (val, progress) =>{
    if(val){
        progress.style.display = "block";
        const bar = progress.querySelector(".progress-bar");
        bar.style.width = `${val}%`;
        bar.setAttribute("aria-valuenow", val);
        bar.innerHTML = `${val}%`;
        return;
    }
    progress.style.display = "none";
}

window.addEventListener('DOMContentLoaded',function(){
    const image_input = document.querySelector("#img_input");
    const form = document.querySelector("#myform");
    const pred = document.querySelector('.pred');
    const alert = document.querySelector('#alert');
    const progress = document.querySelector('#progress');
    let uploaded_img = "";

    // Display Image 
    image_input.addEventListener("change", function(){
         const reader = new FileReader();
         reader.addEventListener("load", () => {
            uploaded_img = reader.result;
            document.querySelector(".display_image").style.backgroundImage = "url(" + uploaded_img+")";
         })
         reader.readAsDataURL(this.files[0])
    })

    // Form Submit
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
                    onsuccess: (responseText)=>{
                        var data = JSON.parse(responseText);
                        pred.innerHTML = data['pred'];
                        popAlert(alert, `Image has been successfully Predicted`, "alert-success");
                    },
                    onprogress: (val) =>progressBar(val, progress),
                    onfailure: (status, statusText)=>popAlert(alert, `${status} - ${statusText}`, "alert-danger"),
                    contentType: false,
                });
            }else
                popAlert(alert, "Image size must be upto 4 mb only", "alert-warning");
        }else
            popAlert(alert, "Image type not supported. Please select a supported image type(png, jpeg, jpg)", "alert-warning");
    })
})