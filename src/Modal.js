import React, { useState } from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function Modal({ setIsOpen, user, updateFunc }) {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, {
      name: name,
      age: Number(age),
      photoUrl: photoUrl,
    });
    updateFunc();
  };

  const changePhotoUrl = (e) => {
    if (e.target.value === "") {
      return;
    }
    setPhotoUrl(e.target.value);
  };
  return (
    <div className="modal_container">
      <div
        className="darkBG"
        onClick={() => setIsOpen(false)}
      />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h4 className="heading">Edit user</h4>
          </div>
          <button
            className="closeBtn"
            onClick={() => setIsOpen(false)}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            <div className="modal_left_div">
              <form action="">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={user.name}
                />
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  placeholder={user.age}
                />
                <input
                  onChange={(e) => changePhotoUrl(e)}
                  type="text"
                  placeholder="photoUrl"
                />
              </form>
            </div>
            <div className="modal_right_div">
              <img
                src={photoUrl}
                alt=""
              />
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="finishBtn"
                onClick={() => {
                  updateUser(user.id);
                  setIsOpen(false);
                }}
              >
                Finish
              </button>
              <button
                className="cancelBtn"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
