import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import firebase from "firebase/app";
import ScrollableFeed from "react-scrollable-feed";
// import { HiOutlineUserGroup } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { RiImageAddLine } from "react-icons/ri";
import FileUpload from "./FileUpload";
import Messages from "./Messages";
import "emoji-mart/css/emoji-mart.css";

function Chat() {
  const params = useParams();
  const [allMessages, setAllMessages] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [userNewMsg, setUserNewMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);

  useEffect(() => {
    if (params.id) {
      db.collection("groups")
        .doc(params.id)
        .onSnapshot((snapshot) => {
          setGroupName(snapshot.data().groupName);
        });

      db.collection("groups")
        .doc(params.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setAllMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
  }, [params]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (userNewMsg && params.id) {
      const userData = JSON.parse(localStorage.getItem("userDetails"));

      if (userData) {
        const displayName = userData.displayName;
        const imgUrl = userData.photoURL;
        const uid = userData.uid;
        const likeCount = 0;
        const likes = {};
        const fireCount = 0;
        const fire = {};
        const heartCount = 0;
        const heart = {};
        const postImg = null;
        const obj = {
          text: userNewMsg,
          timestamp: firebase.firestore.Timestamp.now(),
          userImg: imgUrl,
          userName: displayName,
          uid: uid,
          likeCount: likeCount,
          likes: likes,
          fireCount: fireCount,
          fire: fire,
          heartCount: heartCount,
          heart: heart,
          postImg: postImg,
        };

        db.collection("groups")
          .doc(params.id)
          .collection("messages")
          .add(obj)
          .then((res) => {
            console.log("message sent");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setUserNewMsg("");
    }
  };

  const openModal = () => {
    setModalState(!modalState);
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFileName(e.target.files[0]);
      openModal();
    }
    e.target.value = null;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {modalState ? <FileUpload setState={openModal} file={file} /> : null}

      {/* Header */}
      {/* <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gray-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-full bg-indigo-600/30 shadow-lg">
            <HiOutlineUserGroup className="text-2xl text-indigo-300" />
          </div>
          <h3 className="text-xl font-semibold text-white tracking-wide">{groupName}</h3>
        </div>
        <div className="bg-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300 font-medium">
          {allMessages.length} messages
        </div>
      </div> */}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <ScrollableFeed>
          <div className="space-y-4 py-3">
            {allMessages.map((message) => (
              <Messages
                key={message.id}
                values={message.data}
                msgId={message.id}
              />
            ))}
          </div>
        </ScrollableFeed>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full px-4 py-4 border-t border-gray-700 bg-gray-800 shadow-lg">
        <div className="relative flex items-center p-2 bg-gray-700 rounded-xl shadow-inner">
          {/* File Upload Button */}
          <div className="px-3">
            <input
              accept="image/*"
              className="hidden"
              id="icon-button-file"
              type="file"
              onChange={(e) => handelFileUpload(e)}
            />
            <label htmlFor="icon-button-file" className="cursor-pointer p-2 rounded-full hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center">
              <RiImageAddLine className="text-gray-300 hover:text-indigo-300 text-xl transition-colors" />
            </label>
          </div>

          {/* Message Input Form */}
          <form className="flex-1 flex items-center" onSubmit={(e) => sendMsg(e)}>
            <div className="relative flex-1 mr-2">
              <input
                type="text"
                className="w-full h-12 bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 px-4 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Type a message..."
                value={userNewMsg}
                onChange={(e) => setUserNewMsg(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors focus:outline-none"
            >
              <FiSend className="text-white text-lg" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;