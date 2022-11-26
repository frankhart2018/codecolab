import React from "react";

const CodeEditor = ({ code, codeUpdateHandler }) => {
  console.log("CodeEditor is rendering!", code);
  return (
    <div>
      <textarea
        placeholder="This is where the code goes"
        style={{ width: "80%", height: "500px" }}
        onChange={codeUpdateHandler}
        value={code}
      ></textarea>
    </div>
  );
};

export default CodeEditor;
