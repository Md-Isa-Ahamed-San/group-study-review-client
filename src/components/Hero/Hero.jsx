import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom"
export default function Hero() {
    const {user} = useAuth()
  return (
    <div className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Welcome to EduConnect
        </h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto text-blue-200">
          Empower your learning journey with our innovative online classroom platform. Connect, collaborate, and excel in your studies like never before.
        </p>
        <div className="mt-10">
            {
                user? (<Link to="/dashboard" className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-8 rounded-lg text-lg">
                    Go to Classroom
                  </Link>):(<Link to="/authPanel?mode=signup" className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-8 rounded-lg text-lg">
                    Get Started for Free
                  </Link>)
            }
          
        </div>
      </div>
    </div>
  );
}

