import Head from "next/head";
import styles from "../styles/Home.module.css"
import { app, database } from "../../firebaseConfig";
import { useState } from "react";
import {
  collection,
  addDoc,
} from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const databaseRef = collection(database, "trumf-project");

  const addData = () => {
    addDoc(databaseRef, {
      name: name,
      age: Number(age),
    })
      .then(() => {
        alert("Data Sent");
        getData()
        setName("");
        setAge("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Register</h1>

      <input
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
          type="text"
          value={name}
        />
        <input
          placeholder="Age"
          onChange={(event) => setAge((event.target.value))}
          type="number"
          value={age}
        />
      <button onClick={addData}>Registrer</button>
    </div>
  );
}
