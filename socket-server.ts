import { Server, Socket } from "socket.io";

      
const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", (data: { text: string }) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

console.log("Socket.IO TypeScript server running on port 3001");