import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./registrationAndLogin.css"

interface RegistrationPageProps {}

const RegistrationPage: React.FC<RegistrationPageProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email.trim() === '') {
      alert('Введіть емейл.');
      return;
    }
    if(password.trim() === ""){
      alert("Введіть пароль")
      return
    }
    const isLoginValid = true; 

    if (isLoginValid) {
      navigate("/home")
    }
  };

  return (
    <div className='wrap'>
      <h1 className='title'>Сторінка реєстрації</h1>
      <input
        className='email'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='pass'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='register' onClick={handleLogin}>Зареєструватися</button>
      <button className='registered' onClick={()=>{
        navigate("/login")
      }}><h5>Вже зареєстровані</h5></button>
    </div>
  );
};

export default RegistrationPage;