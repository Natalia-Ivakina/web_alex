import { useState } from "react";
import LoginFormComponent from "./LoginForm";

const LoginButtonComponent = () => {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username, "Password:", password);
    };

    return (
        <div className="login-container">
            <button id="loginButton" onClick={handleLoginClick}>
                <img src="/logome.png" alt="Login" />
            </button>

            {isLoginVisible && (
                <div className="login-form-container">
                    <LoginFormComponent
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        handleSubmit={handleSubmit}
                    />
                </div>
            )}
        </div>
    );
};

export default LoginButtonComponent;