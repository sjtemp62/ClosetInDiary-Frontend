import React from "react";
import { Button } from "../component/Button";
import { Header } from "../LSHeader/Header";
import Title from "../component/Title";
import "./SignIn.css";
import { useSignup } from "../hooks/useSignup";

const SignIn = () => {
  const {
    username,
    setUsername,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
  } = useSignup();

  return (
    <div className="sign-in">
      <div className="div-2">
        <Header className="header-instance" />
        <div className="div-3">
          <div className="sign-in-text">
            <Title
              className="title-instance"
              text="Sign up"
              titleClassName="title-instance"
            />
            <form onSubmit={handleSignup} className="insert">
              <div className="text-field">
                <label className="label-2" htmlFor="input-3">
                  Name
                </label>
                <input
                  className="text-field-2"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="text-field">
                <label className="label-2" htmlFor="input-3">
                  User Name
                </label>
                <input
                  className="text-field-2"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="text-field">
                <label className="label-2" htmlFor="input-3">
                  Email address
                </label>
                <input
                  className="text-field-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="text-field">
                <label className="label-2" htmlFor="input-3">
                  Password
                </label>
                <input
                  className="text-field-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                className="button-instance"
                state="available"
                text="Sign up"
                type="submit"
              />
            </form>
          </div>
          <div className="signin-policy">
            <p className="policy">
              <span className="span">
                By creating an account, you agree to the{" "}
              </span>
              <span className="text-wrapper-2">Terms of use</span>
              <span className="text-wrapper-3">&nbsp;</span>
              <span className="span">and</span>
              <span className="text-wrapper-3">&nbsp;</span>
              <span className="text-wrapper-2">Privacy Policy.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
