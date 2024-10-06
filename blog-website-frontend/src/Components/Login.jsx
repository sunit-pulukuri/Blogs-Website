import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const loginObj = { email, password };

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginObj),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Login successful. AuthToken stored in localStorage");
                localStorage.setItem("authToken", data.token);

                navigate("/blogs");
            } else {
                const errData = await res.json();
                console.error("Login Failed: ", errData);
                alert("Invalid credentials! Please check your username/password or Register")
            }
        } catch (e) {
            console.error(e);
        }
    }

    function handleSignUp() {
        navigate("/register");
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">
                    Sign In to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Sign In
                    </button>
                    <div className="text-center mt-4">
                        <span className="text-gray-400">Don't have an account? </span>
                        <button
                            type="button"
                            onClick={handleSignUp}
                            className="text-gray-300 hover:underline"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
