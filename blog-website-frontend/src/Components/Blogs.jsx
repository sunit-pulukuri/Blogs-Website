import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Blogs() {
    const [allBlogs, setAllBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for authToken in localStorage
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            // Show alert after 1 second and redirect to login
            setTimeout(() => {
                alert('You need to log in to access this page.');
                navigate('/login');
            }, 1000);
            return; // Exit the effect early if not authenticated
        }

        async function fetchAllBlogs() {
            try {
                const res = await fetch('http://localhost:5000/api/blogs/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log('Blogs fetched successfully: ', data);
                    // Reverse the blogs array before setting the state
                    setAllBlogs(data.reverse());
                } else {
                    const errData = await res.json();
                    console.error('Error in fetching data', errData);
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchAllBlogs();
    }, [navigate]);

    function handleExploreBlog(id) {
        navigate(`/exploreblog/${id}`);
    }

    return (
        <div className="h-screen w-full bg-gray-900">
            <Navbar />
            <div className="border-2 w-full h-[90vh] max-h-[90vh] overflow-y-auto flex flex-col items-center p-4 bg-gray-800 thin-scrollbar">
                {allBlogs.map((elem, index) => (
                    <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-6 mb-4 w-full max-w-2xl flex flex-col items-center">
                        <h2 className="text-2xl font-semibold text-gray-100">{elem.title}</h2>
                        {elem.image && (
                            <img src={elem.image} alt={elem.title} className="w-full h-48 object-contain rounded-lg mt-4 bg-gray-800" />
                        )}
                        <p className="text-gray-300 mt-4 line-clamp-3">{elem.matter}</p>
                        <p className="text-sm text-gray-400 mt-2">
                            {new Date(elem.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </p>
                        <button
                            onClick={() => handleExploreBlog(elem._id)}
                            className="mt-4 text-blue-400 hover:text-blue-300 underline"
                        >
                            Show Full
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blogs;
