"use client";

import { createUserService } from "@/lib/services/users/createUserService";
import { useState } from "react";

const SignUpPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    apartment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, confirmPassword, email, apartment } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await createUserService(username, password, email, apartment);

    console.log(await res.json());
    // await newUserVerification(newUser);
  };

  return (
    <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-2xl">
      <div className="box-basic">
        <h1 className="btn- mb-3 text-center text-3xl font-bold">Sign up</h1>

        <form
          className="signup-form-labels flex flex-col"
          onSubmit={signUpHandler}
        >
          <label>
            Username
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label>
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Apartment
            <input
              name="apartment"
              type="text"
              placeholder="Apartment"
              value={formData.apartment}
              onChange={handleChange}
            />
          </label>

          <div className="mt-3 flex w-full justify-center">
            <button className="btn-primary" type="submit">
              Sign up
            </button>
          </div>
        </form>
        <span className="text-red-300">Err</span>
      </div>
    </div>
  );
};

export default SignUpPage;
