const Register = () => {
  return (
    <div>
      <h2>Register</h2>
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
      <button>Register</button>
    </div>
  );
};

export default Register;