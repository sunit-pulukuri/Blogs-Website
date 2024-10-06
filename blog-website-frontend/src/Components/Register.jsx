import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(""); // Reset error state

        // Validation checks
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== password2) {
            setError("Passwords do not match.");
            return;
        }

        const regObject = { username, email, password };

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(regObject),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("authToken", data.token);
                navigate("/blogs");
            } else {
                const errData = await res.json();
                console.log("error: ", errData);
                setError("Registration failed. Please try again."); 
            }
        } catch (e) {
            console.log(e.message);
            setError("An error occurred. Please try again."); 
        }
    }

    function handleLogin() {
        navigate("/login");
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">
                    Create Your Account
                </h2>
                {error && <p className="text-red-500 text-center mb-4">Registration failed! You might already be registered</p>} {/* Error message */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="text"
                        id="username"
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="password"
                        id="password2"
                        placeholder="Re-enter Password"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                    <div className="text-center mt-4">
                        <span className="text-gray-400">Already have an account? </span>
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="text-gray-300 hover:underline"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
