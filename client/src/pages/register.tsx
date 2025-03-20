import React from "react";

const Register: React.FC = () => {
  return (
    <div>
      <form action="" className="flex flex-col backg" >
        <h1>Register</h1>
        <label>Email</label>
        <input className="width-auto" type="email" />

        <label>Password</label>
        <input className="width-auto" type="password" />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;