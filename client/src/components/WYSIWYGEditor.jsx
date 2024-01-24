import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import JoditEditor from "jodit-react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { authContext } from "../App";

const WYSIWYGEditor = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { isLoggedIn, user } = useContext(authContext);
  const socket = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if(socket.current)
    socket.current.emit("send-content", {content});
  }, [content]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      // setOnlineUsers(users);
      console.log(users)
    });
  }, [user]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("update-content", (data) => {
      console.log(data);
      setContent(data);
    });
  }, []);

  const config = {
    readonly: false,
    placeholder: placeholder || "Start typing...",
  };

  // useEffect(() => {
  //   console.log(content)
  // }, [content])

  const handleChange = (content) => {
    // setContent(content)
    console.log(content);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        isFocused={true}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          // setContent(newContent);
        }}
      />
    </div>
  );
};
export default WYSIWYGEditor;
