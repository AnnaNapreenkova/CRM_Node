const { io } = require('../index');

//  Run when client connects
io.on('connection', socket => {
    console.log('dasdsa');
    console.log(socket);
});