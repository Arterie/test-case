import { app } from "../../firebaseConfig";

export default function Register() {
  return (
    <div>
      <h1>Register</h1>

      <input placeholder="Email" className="input-box" />
      <input placeholder="Password" className="input-box" />
    </div>
  );
}
