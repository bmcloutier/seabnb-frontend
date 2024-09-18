import axios from "axios";
import { useState } from "react";

export function SignupPage() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="flex justify-center mt-10 text-blue-900">
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="">
        <div className="flex mb-4">
          <div className="mr-6">
            <label className="block">First Name</label>
            <input className="rounded bg-slate-200 p-2" name="first_name" type="text" />
          </div>
          <div>
            <label className="block">Last Name</label>
            <input className="rounded bg-slate-200 p-2" name="last_name" type="text" />
          </div>
        </div>
        <div className="flex mb-6">
          <div className="mr-6">
            <label className="block">Email</label>
            <input className="rounded bg-slate-200 p-2" name="email" type="email" />
          </div>
          <div>
            <label className="block">Phone</label>
            <input className="rounded bg-slate-200 p-2" name="phone_number" type="text" />
          </div>
        </div>
        <div className="flex mb-6">
          <div className="mr-6">
            <label className="block">Password</label>
            <input className="rounded bg-slate-200 p-2" name="password" type="password" />
          </div>
          <div>
            <label className="block">Password Confirmation</label>
            <input className="rounded bg-slate-200 p-2" name="password_confirmation" type="password" />
          </div>
        </div>
        <button
          type="submit"
          className="rounded border text-blue-900 bg-blue-100 border-blue-900 p-2 hover:bg-blue-200"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
