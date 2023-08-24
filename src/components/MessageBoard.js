import React, { useEffect, useState } from "react";

import "../App.css";
import Messages from "./Messages";
import Modal from "./Modal";

const MessageBoard = () => {
  const [post, setPost] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://mapi.harmoney.dev/api/v1/messages/",
        {
          method: "GET",
          headers: {
            Authorization: "7GI4kvOd8u-0-agL",

            "Content-Type": "application/json",
          },
        }
      );
      const _messages = await response.json();

      setMessages(_messages);
    } catch (err) {}
  };

  const postMessage = async () => {
    try {
      const response = await fetch(
        "https://mapi.harmoney.dev/api/v1/messages/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "7GI4kvOd8u-0-agL",
          },

          body: JSON.stringify({
            text: post,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        setPost("");
        setError("");
        fetchMessages();
      } else {
        setError(data.text[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(
        `https://mapi.harmoney.dev/api/v1/messages/${id}/`,
        {
          headers: {
            Authorization: "7GI4kvOd8u-0-agL",
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );

      if (response.status === 204) {
        fetchMessages();
      }
    } catch (err) {}
  };

  const handleDeleteAllMessages = () => {
    setShowModal(false);
    messages.map((message) => {
      return handleDeleteMessage(message.id);
    });
  };

  return (
    <section className="container">
      <h1>Chatter</h1>
      <h3>Type something in the box below, then hit "Post"</h3>

      <div className="inputContainer">
        <div>
          <input value={post} onChange={(e) => setPost(e.target.value)} />
          <div className="error">{error}</div>
        </div>
        <button className="postCta" onClick={() => postMessage()}>
          Post
        </button>
        <button className="deleteCta" onClick={() => setShowModal(true)}>
          Delete All
        </button>
      </div>

      <Messages messages={messages} handleDeleteMessage={handleDeleteMessage} />

      {showModal && typeof showModal === "boolean" && (
        <Modal
          onOk={handleDeleteAllMessages}
          onCancel={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default MessageBoard;
