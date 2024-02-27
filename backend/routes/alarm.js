const User = require("../models/User");

module.exports = function(io) {
    io.on("connection", async(socket) => {
        console.log("Client Logined", socket.id)

        socket.on("login", async(email, cb) => {
            // user token update
            const user = await User.login(email, socket.id);
            cb({ok:true, data:user})
        })

        socket.on("disconnetc", () => {
            console.log("user is disconnected")
        })
})
}