import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  console.log(req.method)
  if (res.socket.server.io) {
    console.log("Socket is already running.");
  } else {
    console.log("Socket is initializing...");

    const io = new Server(res.socket.server, { path: "/api/socket", addTrailingSlash: false, cors: { origin: "*" } });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
      });
      socket.on("disconnect", function () {
        console.log("user disconnected");
      });
    });

    io.on("disconnect", () => {
      console.log("Socket is disconnecting...");
    });
  }

  res.end();
}
