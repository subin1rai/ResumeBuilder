import { ArrowRight, Star, Users, FileCheck } from "lucide-react";
import React from "react";
import { BackgroundLines } from "../components/backgroundLines";
import Footer from "../components/Footer";
import { FileText, Menu } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Modal from "../components/Modal";
import Login from "../components/login";
import Register from "../components/Register";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Heafer section */}

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                ResumeBuilder
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-3">
              {user ? (
                <span className="font-medium text-gray-700">
                  Hi, {user.name}
                </span>
              ) : (
                <>
                  <button
                    className="text-gray-700 border border-gray-300 px-3 py-2 rounded-sm"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-sm"
                    onClick={() => {
                      setCurrentPage("register");
                      setOpenAuthModel(true);
                    }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Nav Menu */}
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
                        className="text-gray-700 border border-gray-300 px-3 py-2 rounded-sm"
                        onClick={() => navigate("/login")}
                      >
                        Sign In
                      </button>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-sm"
                        onClick={() => {
                          setCurrentPage("register");
                          setOpenAuthModel(true);
                          setIsMenuOpen(false); // close mobile menu
                        }}
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

      {/* Main Content */}
      <main className="flex-grow overflow-auto">
        <section className="pt-26 pb-8 md:pt-30 md:pb-12">
          <BackgroundLines className="flex items-center justify-center w-full flex-col">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Create Your Perfect
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}
                    Resume
                  </span>
                  <br />
                  In Minutes, Not Hours
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Build professional, ATS-friendly resumes with our AI-powered
                  builder. Choose from expert-designed templates and land your
                  dream job faster.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                  <button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 rounded-2xl">
                    <div className="flex flex-row items-center">
                      <h1 className="text-white font-semibold text-lg">
                        Start Building For Free
                      </h1>
                      <ArrowRight className="ml-2 h-5 w-5 text-white" />
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">
                        50,000+
                      </div>
                      <div className="text-gray-600">Happy Users</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FileCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">
                        95%
                      </div>
                      <div className="text-gray-600">ATS Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">
                        4.9/5
                      </div>
                      <div className="text-gray-600">User Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundLines>
        </section>
      </main>

      {/* <Footer /> */}
      {/* model for login/register */}
        {/* Auth Modal */}
        <Modal
          isOpen={openAuthModel}
          onClose={() => {
            setOpenAuthModel(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "register" && (
              <Register setCurrentPage={setCurrentPage} />
            )}
          </div>
        </Modal>
    </div>
  );
};

export default LandingPage;
