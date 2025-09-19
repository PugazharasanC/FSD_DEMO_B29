import { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/applicationApi";
import { setState } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const defaultState = {
    email: "",
    password: "",
  };
  const [data, setData] = useState({ ...defaultState });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  useEffect(() => {
    if (user) navigate("/");
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await login(data).unwrap();
    dispatch(setState(res));
    setData({ ...defaultState });
    navigate("/");
  };
  const handleChange = (event) => {
    setData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="mx-auto p-6 rounded-sm shadow">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          required
          onChange={handleChange}
          className="border rounded-sm"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          required
          onChange={handleChange}
          className="border rounded-sm"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
