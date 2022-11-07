import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import UserCard from "./UserCard";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: name,
      age: Number(age),
    });
  };
  useEffect(
    () => {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      };
      console.log("read from firestore");
      getUsers();
    },
    [
      /*users*/
    ]
  );

  return (
    <div className="App">
      <form action="">
        <input
          /*value={name}*/
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          /*  value={age}*/
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="age"
        />
      </form>
      <button onClick={() => createUser()}>Create user</button>
      {users.map((user, index) => {
        return (
          <UserCard
            user={user}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default App;
{
  /* <div key={index}>
            <h1>name:{user.name}</h1>
            <h1>age:{user.age}</h1>
            <button onClick={() => updateUser(user.id, user.age)}>
              Increase age
            </button>
            <button onClick={() => deleteUser(user.id)}>
              Delete User
            </button>
          </div> */
}
