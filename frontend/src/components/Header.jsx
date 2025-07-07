import { FileText, Menu } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAuthModel, setopenAuthModel] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              ResumeBuilder
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-3">
            {user ? (
              <span className="font-medium text-gray-700">Hi, {user.name}</span>
            ) : (
              <>
                <button
                  variant="outline"
                  className="mr-2"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-sm"
                  onClick={() =>setIsMenuOpen(true)}
                >
                  Get Started
                </button>
              </>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#templates"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Templates
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                {user ? (
                  <span className="text-gray-700 font-medium">
                    Hi, {user.name}
                  </span>
                ) : (
                  <>
                    <button
                      variant="outline"
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-sm"
                      onClick={() => navigate("/register")}
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
