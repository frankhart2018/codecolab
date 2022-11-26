import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./App.css";
import { SOCKET_URL } from "./constants";

import CodeEditor from "./CodeEditor";

const socket = io.connect(SOCKET_URL);

const App = () => {
  const [shouldDisplayCode, setShouldDisplayCode] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.emit("view_code", {
      room_id: "1_sample.py",
      code: code,
    });
    socket.on("code", (data) => {
      console.log("This event is updating!");
      setCode(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Socket changed!");
    socket.on("recv_code", (data) => {
      console.log("Other event is updating!", data);
      setCode(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, code]);

  const closeClickHandlder = () => {
    setShouldDisplayCode(false);
    socket.emit("close_code", {
      room_id: "1_sample.py",
    });
  };

  const codeUpdateHandler = (event) => {
    setCode(event.target.value);
    socket.emit("update_code", {
      room_id: "1_sample.py",
      code: event.target.value,
    });
    console.log("Updating code to: ", event.target.value);
  };

  return (
    <div style={{ padding: "10px" }}>
      <button type="button" onClick={closeClickHandlder}>
        Close main.py
      </button>
      <br />
      <br />
      {shouldDisplayCode && (
        <CodeEditor code={code} codeUpdateHandler={codeUpdateHandler} />
      )}
    </div>
  );
};

export default App;
