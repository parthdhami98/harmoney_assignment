import React, { useState } from "react";

import MessageLogo from "../messenger.png";

const Messages = ({ messages, handleDeleteMessage }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const postNumber = 6;

  const currentPageNumber = pageNumber * postNumber - postNumber;

  const paginatedPost = [...messages]
    .reverse()
    .splice(currentPageNumber, postNumber);

  const getTime = (timeStamp) => {
    return `-${new Date(timeStamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
      second: "numeric",
    })}`;
  };

  return (
    <div>
      {[...paginatedPost].map((message) => (
        <div key={message.id} className="messagesContainer">
          <div className="messageDetails">
            <div className="icon">
              <img src={MessageLogo} alt={message.id} />
            </div>
            <div className="source">{`~${message.source}`}</div>
            <div className="time">{getTime(message.timestamp)}</div>
            <div>
              <button
                type="button"
                className="deleteMessage"
                onClick={() => handleDeleteMessage(message.id)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="messageText">{message.text}</div>
        </div>
      ))}

      {messages.length > 5 && (
        <div className="paginationContainer">
          <button
            className="Cta"
            onClick={() => {
              if (pageNumber === 1) return;
              setPageNumber(pageNumber - 1);
            }}
          >
            Prev
          </button>
          <div className="pageNumber">{pageNumber}</div>
          <button className="Cta" onClick={() => setPageNumber(pageNumber + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Messages;
