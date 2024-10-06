import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate('/bye');
    }

    function handleMyBlogs() {
        navigate('/myblogs');
    }

    function handleHome() {
        navigate('/blogs');
    }

    function handleAllBlogs() {
        navigate('/blogs');
    }

    function handleCreateBlog() {
        navigate('/newblog');
    }

    return (
        <div className="w-full h-16 flex justify-between items-center bg-gray-900 p-4 shadow-lg">
            <button 
                onClick={handleHome} 
                className="text-2xl font-bold text-gray-200 hover:text-gray-400 transition duration-200"
            >
                Blogs Website
            </button>
            <div className="flex gap-4 items-center">
                <button 
                    onClick={handleAllBlogs} 
                    className="text-gray-200 border border-gray-600 px-4 py-2 rounded hover:bg-gray-800 hover:border-gray-500 transition duration-200"
                >
                    Explore
                </button>
                <button 
                    onClick={handleCreateBlog} 
                    className="text-gray-200 border border-gray-600 px-4 py-2 rounded hover:bg-gray-800 hover:border-gray-500 transition duration-200"
                >
                    Create New Blog
                </button>
                <button 
                    onClick={handleMyBlogs} 
                    className="text-gray-200 border border-gray-600 px-4 py-2 rounded hover:bg-gray-800 hover:border-gray-500 transition duration-200"
                >
                    My Blogs
                </button>
                <button 
                    onClick={handleLogout} 
                    className="text-gray-200 border border-gray-600 px-4 py-2 rounded hover:bg-gray-800 hover:border-gray-500 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;
