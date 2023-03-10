import Head from "next/head";
import styles from "../styles/Home.module.css"
import { app, database } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, "trumf-project");
  let router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
      getData();
    }
    if (!token) {
      router.push("/register");
    }
  }, []);

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

  const getData = async () => {
    await getDocs(databaseRef).then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  const getId = (id, name, age) => {
    setId(id);
    setName(name);
    setAge(age);
    setIsUpdate(true);
  };

  const updateFields = () => {
    let fieldToEdit = doc(database, "trumf-project", id);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age),
    })
      .then(() => {
        alert("Data Updated");
        getData()
        setName("");
        setAge("");
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, "trumf-project", id);
    deleteDoc(fieldToEdit)
    .then(() => {
      alert("This Data deleted")
      getData()
    })
    .catch((err) => {
      alert("Cant delete")
    })
  }

  const logOut = () => {
    sessionStorage.removeItem("Token")
    router.push("/register")
  }

  return (
    <>
      <Head>
        <title>Trumf Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <button className={styles.btn} onClick={logOut}>Log Out</button>
        </div>
        <h1>Home</h1>
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
        {isUpdate ? (
          <button onClick={updateFields}>Update</button>
        ) : (
          <button onClick={addData}>ADD</button>
        )}

        <div>
          {fireData.map((data) => {
            return (
              <div key={data.id}>
                <h3>Name: {data.name}</h3>
                <p>Age: {data.age}</p>
                <button onClick={() => getId(data.id, data.name, data.age)}>
                  Update
                </button>
                <button onClick={() => deleteDocument(data.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
