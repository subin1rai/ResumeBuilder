import { ArrowRight, Star, Users, FileCheck } from "lucide-react";
import React from "react";
import { BackgroundLines } from "../components/backgroundLines";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow overflow-auto">
       <section className="pt-20 pb-8 md:pt-24 md:pb-12">

          <BackgroundLines className="flex items-center justify-center w-full flex-col">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Create Your Perfect
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}Resume
                  </span>
                  <br />
                  In Minutes, Not Hours
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Build professional, ATS-friendly resumes with our AI-powered
                  builder. Choose from expert-designed templates and land your dream
                  job faster.
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
                      <div className="text-2xl font-bold text-gray-900">50,000+</div>
                      <div className="text-gray-600">Happy Users</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FileCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">95%</div>
                      <div className="text-gray-600">ATS Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">4.9/5</div>
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
    </div>
  );
};

export default LandingPage;
