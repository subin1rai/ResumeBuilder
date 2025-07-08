import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  FileText,
  Sparkles,
  Eye,
  Edit3,
  Download,
  MoreVertical,
  Calendar,
  User,
} from "lucide-react";
import { fetchResume } from "../api/reesume.api";
import Modal from "../components/Modal";
import CreateResumeForm from "../components/CreateResumeForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModel, setopenCreateModel] = useState(false);
  const [allResume, setAllResume] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllResume = async () => {
    try {
      setLoading(true);
      const response = await fetchResume();
      console.log("Resume API response:", response.resume);
      setAllResume(response.resume);
    } catch (error) {
      console.log(" Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResume();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div className="mb-6 sm:mb-0">
            <div className="flex items-center mb-4">
              <div className="flex-col justify-start items-start">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                  My Resume
                </h1>
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
                  <p className="text-gray-600 text-lg font-medium">
                    Start Building your professional Resume
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-800"
              onClick={() => setopenCreateModel(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Plus className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-90" />
              <span className="relative z-10">Create Now</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(allResume) &&
              allResume.length > 0 &&
              allResume.map((resume, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-200"
                  onClick={() => navigate(`/resume/${resume.resumeId}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {resume.title || "Untitled Resume"}
                      </h2>
                    </div>
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </div>

                  {/* <div className="flex flex-col gap-3 mt-4">
                    <button
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                      onClick={() => navigate(`/resume/${resume.id}`)}
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button className="flex items-center gap-2 text-yellow-600 hover:text-yellow-800 transition">
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button className="flex items-center gap-2 text-green-600 hover:text-green-800 transition">
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div> */}
                </div>
              ))}

            {allResume.length === 0 && (
              <div className="col-span-full">
                <div className="text-center py-20">
                  <div className="relative mx-auto mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-pulse delay-75"></div>
                    </div>
                    <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Ready to create your first resume?
                  </h3>
                  <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    Build a professional resume that stands out and lands you
                    your dream job
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/*  model*/}
      <Modal
        isOpen={openCreateModel}
        onClose={() => setopenCreateModel(false)}
        hideHeader
        maxWidth="max-w-2xl"
      >
        <div className="p-6">
          <div className="">
            {/* <h3 className="text-start font-semibold font-2xl"> Create New Resume</h3> */}
          
          </div>
          <CreateResumeForm
            onSuccess={() => {
              setopenCreateModel(false);
              fetchAllResume();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
