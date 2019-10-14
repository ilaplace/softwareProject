import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">This is your MD</h1>

    <p className="lead">
    This should be a new age!
    </p>
  </div>
);

export default Hero;
