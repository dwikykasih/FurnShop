module.exports = {
    mongoURI: 'mongodb+srv://lionju:<lionju17>@cluster0-arwmc.mongodb.net/test?retryWrites=true&w=majority'
}
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}