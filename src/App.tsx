import { useEffect, useState } from "react";
import Messageinput from "./Messageinput";
import Messages from "./Messages";
import { io, Socket } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  return (
    <>
      {""}
      <Messageinput send={send} />
      <Messages messages={messages} />
    </>
  );
}

export default App;
