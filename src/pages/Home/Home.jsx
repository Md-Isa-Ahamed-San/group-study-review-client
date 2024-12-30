import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
    // <div>
    //   <p className="text-3xl">inside home page</p>
    //   <Link to="/dashboard">
    //   <button className="border-red-400 p-20 border">
    //     dashboard
    //   </button>
    //   </Link>
    //   <button className="border-red-400 p-20 border" onClick={handleLogout}>
    //     logout
    //   </button>
    //   <Link to="/authPanel">
    //     <button className="border-red-400 p-20 border">login</button>
    //   </Link>
    // </div>
  );
};

export default Home;
