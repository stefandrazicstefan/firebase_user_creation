import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import UserCard from "./UserCard";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [age, setAge] = useState(0);

  const updateUsersInApp = () => {
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
  };

  const createUser = () => {
    const createSingleUser = async () => {
      await addDoc(usersCollectionRef, {
        name: name,
        age: Number(age),
        photoUrl: photoUrl,
      });
    };

    createSingleUser();
    updateUsersInApp();
  };

  /*  const createUser = async () => {
    if (photoUrl === "") {
      console.log("usao u postavljanje photourl");
      setPhotoUrl(
        "https://images.unsplash.com/photo-1667870989611-c98033c6a534?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
      );
      console.log(`postavljeni url je ${photoUrl}`);
    }

    await addDoc(usersCollectionRef, {
      name: name,
      age: Number(age),
      photoUrl: photoUrl,
    });
    updateUsersInApp();
    setPhotoUrl("");
    setName("");
    setAge(0);
  }; */

  useEffect(() => {
    updateUsersInApp();
  }, []);

  return (
    <div className="App">
      <form action="">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="age"
        />
        <input
          onChange={(e) => setPhotoUrl(e.target.value)}
          type="text"
          placeholder="photoUrl"
        />
      </form>
      <button onClick={createUser}>Create user</button>
      {users.map((user, index) => {
        return (
          <UserCard
            user={user}
            key={index}
            updateFunc={updateUsersInApp}
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
