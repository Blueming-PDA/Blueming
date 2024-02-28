// socketEvents.js
import socket from './socket';


export const setSid = (userObj) => {
    socket.emit('setSid', userObj);
  }
export const emitMessage = (message) => {
    socket.emit("message", { title: message, content: message })
}

