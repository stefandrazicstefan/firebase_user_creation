import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: name, age: age });
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getUsers();
  }, [users]);

  return (
    <div className="App">
      <form action="">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="age"
        />
      </form>
      <button onClick={() => createUser()}>Create user</button>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <h1>name:{user.name}</h1>
            <h1>age:{user.age}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
