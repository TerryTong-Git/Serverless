const button = document.getElementById('button')
button.addEventListener('click', async function (event) {
    let name1 = document.getElementById("name1").value
    let name2 = document.getElementById("name2").value
    let name3 = document.getElementById("name3").value
    let name4 = document.getElementById("name4").value

    const resp = await fetch( `https://terryserverless.azurewebsites.net/api/twocatz?code=IVSBIaEAa3Y68zFqIsxBqiIMFhBzy5PN4asa1ajJlP8VAzFuzpL5rQ==&name1=${name1}&name2=${name2}&name3=${name3}&name4=${name4}`, {
        method:"GET"
    })
    const data = await resp.json()

    document.getElementById("image1").src = " data:image/png;base64," + data.cat1
    document.getElementById("image2").src = " data:image/png;base64," + data.cat2
    document.getElementById("image3").src = " data:image/png;base64," + data.cat3
    document.getElementById("image4").src = " data:image/png;base64," + data.cat4
    

})