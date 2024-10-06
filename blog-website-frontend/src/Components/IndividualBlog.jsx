import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function IndividualBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [userComment, setUserComment] = useState("");
    const authToken = localStorage.getItem('authToken');
    const [usernames, setUsernames] = useState({}); // Store usernames keyed by userId

    useEffect(() => {
        async function fetchBlog() {
            const authToken = localStorage.getItem('authToken');
            try {
                const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                    setComments(data.comments);
                    // Fetch usernames for each comment's userId
                    data.comments.forEach(comment => {
                        getUserDetails(comment.userId); // Fetch username for each comment
                    });
                } else {
                    const errData = await res.json();
                    console.error("Error fetching blog:", errData);
                }
            } catch (e) {
                console.error("Error:", e.message);
            }
        }

        fetchBlog();
    }, [id, comments]);
    const getUserDetails = async (userId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}` 
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUsernames(prev => ({ ...prev, [userId]: data.username })); 
            } else {
                const errData = await res.json();
                console.log(errData);
            }
        } catch (e) {
            console.log("error:", e.message);
        }
    };

    const handleBackToBlogs = () => {
        navigate('/blogs');
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = async () => {
        const commentBody = {
            comment: userComment
        };
        const commentJson = JSON.stringify(commentBody);
        try {
            const res = await fetch(`http://localhost:5000/api/blogs/addcomment/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: commentJson
            });
            if (res.ok) {
                const newComment = await res.json();
                setComments([...comments, newComment]);
                setUserComment("");
                getUserDetails(newComment.userId); // Fetch username for the new comment
            } else {
                const errData = await res.json();
                console.log(errData);
            }
        } catch (e) {
            console.log("error:", e.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
            <button 
                onClick={handleBackToBlogs}
                className="fixed top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition z-50"
            >
                Back to Blogs
            </button>

            {blog ? (
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{blog.title}</h2>
                    {blog.image && (
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="w-full h-64 object-cover rounded-lg mb-6" 
                        />
                    )}
                    <p className="text-lg text-gray-700 leading-relaxed">{blog.matter}</p>
                    <p className="text-sm text-gray-500 mt-4">Author: {blog.author}</p>

                    <div className="mt-8">
                        <textarea 
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                            placeholder="Add a public comment..."
                            className="w-full border-2 rounded-lg p-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                        ></textarea>
                        <div className="flex justify-end mt-2">
                            <button 
                                className="px-6 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 mr-2"
                                onClick={() => setUserComment("")}
                            >
                                Cancel
                            </button>
                            <button 
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                onClick={handleAddComment}
                            >
                                Comment
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={toggleComments}
                        className="mt-10 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        {showComments ? "Hide Comments" : "Show Comments"}
                    </button>

                    {showComments && (
                        <ul className="mt-6 bg-gray-50 p-4 rounded-lg space-y-4">
                            {comments.length > 0 ? (
                                comments
                                    .slice()
                                    .reverse()
                                    .map((elem, index) => (
                                        <li key={index} className="flex items-start space-x-4 border-b border-gray-300 pb-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl">
                                                    /
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-700 font-semibold">{usernames[elem.userId] || elem.userId}</p> {/* Use username or fallback to userId */}
                                                <p className="text-gray-600 mt-1">{elem.comment}</p>
                                                <div className="text-sm text-gray-400 mt-1">Just now</div>
                                            </div>
                                        </li>
                                    ))
                            ) : (
                                <p className="text-gray-600">No comments available</p>
                            )}
                        </ul>
                    )}
                </div>
            ) : (
                <p className="text-lg text-gray-700">Loading blog...</p>
            )}
        </div>
    );
}

export default IndividualBlog;
