"use client";

import { useDisplayMessage } from "@/components/useDisplayMessage";
import { createUserService } from "@/lib/services/users/createUserService";
import { redirect } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const SignUpPage = () => {
  const { displayMessage, errorMessage } = useDisplayMessage();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    apartment: "",
  });

  const isValidEmail = (email: string) => {
    return !z.string().email().safeParse(email).success && email.length > 0;
  };

  const isValidApartment = (app: string) => {
    return !/^[abAB]\d{1,3}$/.test(app) && app.length > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, confirmPassword, email, apartment } = formData;

    if (!username) {
      displayMessage("Username required");
      return;
    }

    if (password !== confirmPassword) {
      displayMessage("Passwords do not match");
      return;
    }

    if (!email) {
      displayMessage("Email required");
      return;
    }

    if (!apartment || isValidApartment(apartment)) {
      displayMessage("Apartment required");
      return;
    }

    const res = await createUserService(username, password, email, apartment);
    const data = await res.json();
    console.log(res);
    console.log(data);

    if (res.status === 200) {
      redirect("/login");
    }

    if (data.error) {
      displayMessage(data.error);
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="box-basic w-fit text-2xl">
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
              className={`${isValidEmail(formData.email) ? "bg-red-200" : ""}`}
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Apartment
            <input
              className={`${isValidApartment(formData.apartment) ? "bg-red-200" : ""}`}
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
        <span className="text-red-800">{errorMessage}</span>
      </div>
    </div>
  );
};

export default SignUpPage;
