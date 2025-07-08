import { FileText, Menu } from "lucide-react";
import { useContext  } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import Login from "./login";
import Register from "./Register";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <Link to="/" className="text-2xl font-bold text-gray-900">
              ResumeBuilder
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            {user &&
              <span className="font-medium text-gray-700">Hi, {user.name}</span>
            }
          </nav>

        </div>

      </div>
    </header>
  );
};

export default Header;
