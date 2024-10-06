import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getBlogs() {
            try {
                const authToken = localStorage.getItem("authToken");
                const res = await fetch("http://localhost:5000/api/blogs/myblogs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setBlogs([...data.message]);
                } else {
                    const err = await res.json();
                    console.log(err);
                }
            } catch (e) {
                console.log("error: ", e.message);
            }
        }

        getBlogs();
    }, []);

    async function handleDelete(id) {
        try {
            const authToken = localStorage.getItem("authToken");
            const res = await fetch(`http://localhost:5000/api/blogs/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the deleted blog from the list
            } else {
                const errData = await res.json();
                console.log(errData);
            }
        } catch (e) {
            console.log("Error : ", e.message);
        }
    }

    function handleEdit(id) {
        navigate(`/editblog/${id}`);
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="fixed top-0 w-full mb-3">
                <Navbar />
            </div>
            <div className="w-full flex items-center justify-center flex-col mt-16">
                <div className="my-8">
                    <h1 className="text-4xl font-bold text-gray-100">My Blogs</h1>
                </div>
                <div className="w-full max-w-4xl">
                    <div className="border-2 w-full h-full overflow-y-auto p-4 flex flex-col items-center bg-gray-800 thin-scrollbar">
                        {blogs.length > 0 ? (
                            blogs.map((elem, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-4 mb-4 w-full max-w-2xl flex flex-col items-center"
                                >
                                    <h2 className="text-xl font-semibold text-gray-100">{elem.title}</h2>
                                    {elem.image && (
                                        <img
                                            src={elem.image}
                                            alt={elem.title}
                                            className="w-full h-48 object-contain rounded-lg mt-2 bg-gray-800"
                                        />
                                    )}
                                    <p className="text-gray-300 mt-2 line-clamp-3">{elem.matter}</p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        {new Date(elem.createdAt).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                                            onClick={() => handleDelete(elem._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                                            onClick={() => handleEdit(elem._id)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 mt-4">
                                <p>You did not write any blogs :( </p>
                                <p className="mt-2 text-blue-500 underline cursor-pointer" onClick={() => navigate('/newblog')}>
                                    Start writing your first blog
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyBlogs;
