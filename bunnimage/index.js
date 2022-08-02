const bunnform = document.getElementById('bunnForm');
bunnform.addEventListener('submit', async function (event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    
    const output = document.getElementById("output")
    if (username == "") {
        alert("No name error.")
        return
    } 
    let fileInput = document.getElementById("image")
    let payload = new FormData(bunnform);
    console.log(payload)
    let file = fileInput.files[0]
    payload.append("file", file)
    const config = {
        "method" : "POST",
        "headers" : {
            "codename": username,
            },
        "body": payload
    }
    const response = await fetch("https://terryserverless.azurewebsites.net/api/bunnimage-upload?code=SFwTmXMooRcIx5w_pSVyZq09XmV6Hw30fAFGoRfuRXX2AzFu1waFOA==", config)
    

    try {
        let done = await response.text()
        output.textContent = "Your image has been stored successfully!"
    } catch (e){
        console.log(e)
    }

})

// const file = document.getElementsByName("image").value;
// if (file) {

// }
// file.addEventListener("change", function(event) {
//     var allowedfiles = [".jpg", ".png"]
//     var fileupload = document.getElementById("image")
//     var error = document.getElementById("error");
// })
