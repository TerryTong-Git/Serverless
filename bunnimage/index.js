const bunnform = document.getElementById('bunnform');
bunnform.addEventListener('submit', function(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const output = document.getElementById("output")
    output.textContent = username + "❤"
})