module.exports = async function (context, req) {
    const morse = require('morse-code-converter')
    const plaintext = req.query.plaintext
    if (typeof plaintext === 'undefined'|| plaintext === '') {
        responseMessage =  'Please enter some text to  convert!'
    } else {
        responseMessage = morse.textToMorse(plaintext)
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}