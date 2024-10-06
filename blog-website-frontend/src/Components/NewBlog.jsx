import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NewBlog() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [matter, setMatter] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const blogObject = {
            title,
            image,
            matter,
            author
        };
        const authToken = localStorage.getItem('authToken');
        const jsonObj = JSON.stringify(blogObject);
        try {
            const res = await fetch("http://localhost:5000/api/blogs/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: jsonObj
            });
            console.log(res);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
            } else {
                const err = await res.json();
                console.log(err);
            }
        } catch (e) {
            console.log(e.message);
        }

        navigate('/myblogs');
    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center'>
            <Navbar />
            <div className='my-8'>
                <h1 className='text-4xl font-bold text-gray-800'>Create a New Blog</h1>
            </div>
            <div className='w-full max-w-3xl p-6 bg-white shadow-md rounded-lg'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor="title" className='block text-lg font-medium text-gray-700'>Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className='block text-lg font-medium text-gray-700'>Image URL</label>
                        <input
                            type="text"
                            id="image"
                            placeholder="Enter Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>
                    <div>
                        <label htmlFor="matter" className='block text-lg font-medium text-gray-700'>Content</label>
                        <textarea
                            id="matter"
                            placeholder="Write your blog content here..."
                            value={matter}
                            onChange={(e) => setMatter(e.target.value)}
                            className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40 resize-none'
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className='block text-lg font-medium text-gray-700'>Author</label>
                        <input
                            type="text"
                            id="author"
                            placeholder="Author Name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className='px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewBlog;
