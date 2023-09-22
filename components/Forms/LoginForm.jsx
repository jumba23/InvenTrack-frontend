import React from "react";

const LoginForm = ({ onSubmit, error }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LoginForm;
