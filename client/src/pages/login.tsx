import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /*   const [login, { data }] = useMutation(LOGIN_USER);
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*   try {
        await login({ variables: { email, password } });
      } catch (err) {
        console.error(err);
      } */
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col m-1 p-1 text-black radius-100 border-gray-600">
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="cursor-pointer" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;