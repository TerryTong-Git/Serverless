

const button = document.getElementById('button')
button.addEventListener('click', async function (event) {
    if (document.getElementById("input")) {
        let cat = document.getElementById("input").value
        document.getElementById("image").src = " https://cataas.com/cat/says/" + cat
    }
})
