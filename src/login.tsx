import { useState } from "react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleSubmit } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = (data) => {
    console.log("Login form submitted with data:", data);
      if (email.trim() === "") {
        alert("Введіть емейл.");
        return;
      }
      if (password.trim() === "") {
        alert("Введіть пароль");
        return;
      }
      if (data === data) {
        navigate("/home");
      }
    };

    return (
      <div>
        <h2>Сторінка входу</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Зайти</button>
        </form>
      </div>
    );
  };
export default LoginPage;
