import React, { useState } from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function Modal({ setIsOpen, user, updateFunc }) {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const finishEdit = () => {
    if (name === "") {
      alert("Name can not be empty.");
      return;
    }
    if (age === "") {
      alert("Age can not be empty.");
      return;
    }
    updateUser(user.id);
    setIsOpen(false);
  };

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
      setPhotoUrl(user.photoUrl);
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
                <span>
                  <input
                    onChange={(e) => changePhotoUrl(e)}
                    type="text"
                    placeholder="photoUrl"
                  />
                  <MdOutlineCancel
                    className="remove_image"
                    title="Remove image"
                    onClick={() => {
                      setPhotoUrl(
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      );
                    }}
                  />
                </span>
              </form>
            </div>
            <div className="modal_right_div">
              <img
                src={photoUrl}
                alt=""
                onError={(e) => {
                  setPhotoUrl(
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  );
                }}
                // onError={(e) => {
                //   e.target.src =
                //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                // }}
              />
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="finishBtn"
                onClick={() => {
                  finishEdit();
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
