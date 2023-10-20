import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

function App() {
  const [id, setId] = useState("");
  const [Socket, setSocket] = useState("");

  useEffect(() => {
    if (Socket) Socket?.connect({}, onConnected, (err)=>console.log(err));
  }, [Socket]);

  const handleConnect = () => {
    
    let Sock = new SockJS("/socket");
    let client = over(Sock);
    console.log(client);
    setSocket(client);
  };

  const onConnected = () => {
    let id = Socket.subscribe(`/user/aman/notifications`, onGetNotifications);
    console.log("id", id);
    setId(id);
  };

  const onGetNotifications = (payload) => {
    console.log(JSON.parse(payload));
  };

  const handleDisconnect = () => {
    Socket?.disconnect();
  };

  return (
    <div className="App">
      <button onClick={handleConnect}>Connect To Socket</button>
      <button onClick={handleDisconnect}>Disconnect From Socket</button>
    </div>
  );
}

export default App;
