import { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useRouter } from "next/router";

export default function Register() {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response.user)
      sessionStorage.setItem("Token", response.user.accessToken);
      router.push("/home")
    })

  }

  useEffect(() => {
    let token = sessionStorage.getItem("Token")

    if(token) {
      router.push("/home")
    }
  }, [])

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        className="input-box"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        type="email"
      />
      <input
        placeholder="Password"
        className="input-box"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
      />
      <button onClick={signUp}>Log in</button>
    </div>
  );
}