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
  const [age, setAge] = useState("");

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

    setName("");
    setAge("");
    setPhotoUrl(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
  };

  useEffect(() => {
    updateUsersInApp();
  }, []);

  const changePhotoUrl = (e) => {
    if (e.target.value === "") {
      setPhotoUrl(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      );
      return;
    }
    setPhotoUrl(e.target.value);
  };
  return (
    <div className="app">
      <div className="create_component">
        <div className="create_div">
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
            <input
              onChange={(e) => changePhotoUrl(e)}
              type="text"
              placeholder="photoUrl"
            />
          </form>
          <button onClick={createUser}>Create user</button>
        </div>
      </div>
      <div className="users">
        {" "}
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
    </div>
  );
}

export default App;
