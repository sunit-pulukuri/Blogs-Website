import { Link } from "react-router-dom";

function Home(){
    return(
        <div id="mainbg" className="w-[100vw] h-[100vh] flex items-center justify-center p-4">
            <div className="text-7xl text-white font-bold text-center">
                BLOG IT LIKE YOU MEAN IT
                <div>

                </div>
                <div className="text-2xl w-[100vw] flex gap-4 justify-center items-center my-4">
                    <Link to={'/login'}><button className="hover:text-red-600">Login</button> </Link>
                    <Link to={'/register'}> <button className="hover:text-red-600">Register</button> </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default Home;