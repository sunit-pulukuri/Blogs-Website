import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Bye() {
    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg border border-gray-700 rounded-lg p-10 shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Thanks For Visiting!</h1>
                <p className="text-lg">You will be redirected shortly...</p>
            </div>
        </div>
    );
}

export default Bye;
    