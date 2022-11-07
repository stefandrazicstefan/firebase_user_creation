import React from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function UserCard({ user, index }) {
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, { age: Number(age) + 1 });
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <div>
      <h1>name:{user.name}</h1>
      <h1>age:{user.age}</h1>
      <button onClick={() => updateUser(user.id, user.age)}>
        Increase age
      </button>
      <button onClick={() => deleteUser(user.id)}>Delete User</button>
    </div>
  );
}

export default UserCard;
