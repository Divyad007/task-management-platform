const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Name:</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" id="password" />
      </div>
      <button>Sign In</button>
    </div>
  );
};

export default Login;