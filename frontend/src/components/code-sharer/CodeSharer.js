import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router";

import CodeEditor from "./CodeEditor";

const socket = io.connect(process.env.REACT_APP_CODE_SHARER_API_BASE);

const CodeSharer = () => {
  console.log(
    "Connected to socket server: ",
    process.env.REACT_APP_CODE_SHARER_API_BASE
  );

  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const room_id = paths[paths.length - 1];

  const [shouldDisplayCode, setShouldDisplayCode] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.emit("view_code", {
      room_id: room_id,
      code: code,
    });
    socket.on("code", (data) => {
      setCode(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("recv_code", (data) => {
      setCode(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, code]);

  const closeClickHandlder = () => {
    setShouldDisplayCode(false);
    socket.disconnect();
  };

  const codeUpdateHandler = (event) => {
    setCode(event.target.value);
    socket.emit("update_code", {
      room_id: room_id,
      code: event.target.value,
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <button type="button" onClick={closeClickHandlder}>
        Close {room_id}
      </button>
      <br />
      <br />
      {shouldDisplayCode && (
        <CodeEditor code={code} codeUpdateHandler={codeUpdateHandler} />
      )}
    </div>
  );
};

export default CodeSharer;
