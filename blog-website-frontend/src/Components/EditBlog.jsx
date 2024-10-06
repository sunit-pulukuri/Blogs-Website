import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
function EditBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [authToken, setAuthToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBlog() {
            try {
                const authToken = localStorage.getItem('authToken');
                setAuthToken(authToken);
                const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                } else {
                    const errData = await res.json();
                    console.log({ message: errData });
                }
            } catch (e) {
                console.log({ message: e.message });
            }
        }

        fetchBlog();
    }, [id]);

    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/api/blogs/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(blog),
            });

            if (res.ok) {
                console.log('Updated Successfully', await res.json());
                navigate('/myblogs');
            } else {
                const errData = await res.json();
                console.log(errData);
            }
        } catch (e) {
            console.log('Error:', e.message);
        }
    }

    return (
        
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Navbar/>
            <div className="my-8">
                <h1 className="text-4xl font-bold text-gray-800">Edit Your Blog</h1>
            </div>
            <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            placeholder="Image URL"
                            value={blog.image}
                            onChange={(e) => setBlog({ ...blog, image: e.target.value })}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="matter" className="block text-lg font-medium text-gray-700">Content</label>
                        <textarea
                            id="matter"
                            placeholder="Write your blog content here..."
                            value={blog.matter}
                            onChange={(e) => setBlog({ ...blog, matter: e.target.value })}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40 resize-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-lg font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            id="author"
                            placeholder="Author Name"
                            value={blog.author}
                            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Make Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBlog;
