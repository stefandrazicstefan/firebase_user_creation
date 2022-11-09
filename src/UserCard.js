import React from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./UserCard.css";
import Modal from "./Modal";

function UserCard({
  currentUser,
  setCurrentUser,
  user,
  updateFunc,
  setIsOpen,
}) {
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    updateFunc();
  };
  return (
    <div className="user_card">
      <div className="upper_div">
        <div className="upper_div_left">
          <h1>{user.name}</h1>
          <h1>{user.age}</h1>
        </div>
        <div className="upper_div_right">
          <img
            src={user.photoUrl}
            alt=""
          />
        </div>
      </div>
      <div className="lower_div">
        <button
          className="edit_user"
          onClick={() => {
            setCurrentUser(user);
            setIsOpen(true);
          }}
        >
          Edit Member
        </button>

        <button
          className="delete_user"
          onClick={() => deleteUser(user.id)}
        >
          Delete Member
        </button>
      </div>
    </div>
  );
}

export default UserCard;
