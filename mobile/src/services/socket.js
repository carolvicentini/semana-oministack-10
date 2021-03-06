import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.102:3333', {
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function subscribeToUpdatedDevs(subscribeFunction) {
    socket.on('update-dev', subscribeFunction);
}

function subscribeToRemovedDevs(subscribeFunction) {
    socket.on('remove-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();

}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
    subscribeToUpdatedDevs,
    subscribeToRemovedDevs,
};