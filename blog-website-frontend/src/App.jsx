import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Blogs from "./Components/Blogs";
import MyBlogs from "./Components/MyBlogs"
import EditBlog from "./Components/EditBlog";
import NewBlog from "./Components/NewBlog";
import Bye from "./Components/Bye";
import IndividualBlog from "./Components/IndividualBlog";
function App(){
    return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/blogs" element={<Blogs/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/myblogs" element={<MyBlogs/>}></Route>
            <Route path="/newblog" element={<NewBlog/>}></Route>
            <Route path="/editblog/:id" element={<EditBlog/>}></Route>
            <Route path="/exploreblog/:id" element={<IndividualBlog/>}></Route>
            <Route path="/bye" element={<Bye/>}></Route>

        {/* This is app */}
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;