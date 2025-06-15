import { Server, Socket } from "socket.io";

      
const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {

  socket.on("send_message", (data: { text: string }) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {});
});

console.log("🚀 Socket.IO server is running on port 3001");