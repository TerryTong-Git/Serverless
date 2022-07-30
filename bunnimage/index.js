const bunnform = document.getElementById('bunnform');
bunnform.addEventListener('submit', function(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const output = document.getElementById("output")
    if (username == "") {
        alert("No name error.")
    } else {
        output.textContent = "Thanks!"
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
