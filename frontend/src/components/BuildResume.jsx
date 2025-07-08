import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { TitleInput } from "./Input";
import { useParams, useNavigate } from "react-router-dom";
import { Download, ArrowLeft, ArrowRight, Save } from "lucide-react";
import axiosInstance from "../lib/axios";

// Form Components
const ProfileInfoForm = ({ profileData, updateSection, onNext }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={profileData.fullName}
          onChange={(e) => updateSection("fullName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Designation *
        </label>
        <input
          type="text"
          value={profileData.designation}
          onChange={(e) => updateSection("designation", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Software Engineer"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary *
        </label>
        <textarea
          value={profileData.summary}
          onChange={(e) => updateSection("summary", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a brief summary about yourself"
        />
      </div>
    </div>
  </div>
);

const ContactInfoForm = ({ contactInfo, updateSection }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={contactInfo.email}
          onChange={(e) => updateSection("email", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          value={contactInfo.phone}
          onChange={(e) => updateSection("phone", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1234567890"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          value={contactInfo.location}
          onChange={(e) => updateSection("location", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="City, Country"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LinkedIn
        </label>
        <input
          type="url"
          value={contactInfo.linkedin}
          onChange={(e) => updateSection("linkedin", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          GitHub
        </label>
        <input
          type="url"
          value={contactInfo.github}
          onChange={(e) => updateSection("github", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://github.com/yourusername"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website
        </label>
        <input
          type="url"
          value={contactInfo.website}
          onChange={(e) => updateSection("website", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://yourwebsite.com"
        />
      </div>
    </div>
  </div>
);

const WorkExperienceForm = ({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
      <button
        onClick={() => addArrayItem({
          companyName: "",
          jobTitle: "",
          role: "",
          start: "",
          end: "",
          description: "",
        })}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Experience
      </button>
    </div>
    {workExperience.map((exp, index) => (
      <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
        {workExperience.length > 1 && (
          <button
            onClick={() => removeArrayItem(index)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={exp.companyName}
              onChange={(e) => updateArrayItem(index, "companyName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={exp.jobTitle}
              onChange={(e) => updateArrayItem(index, "jobTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <input
              type="text"
              value={exp.role}
              onChange={(e) => updateArrayItem(index, "role", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={exp.start}
                onChange={(e) => updateArrayItem(index, "start", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={exp.end}
                onChange={(e) => updateArrayItem(index, "end", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) => updateArrayItem(index, "description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your role and achievements"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EducationDetailsForm = ({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">Education</h2>
      <button
        onClick={() => addArrayItem({
          institutionName: "",
          degree: "",
          start: "",
          end: "",
          description: "",
        })}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Education
      </button>
    </div>
    {educationInfo.map((edu, index) => (
      <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
        {educationInfo.length > 1 && (
          <button
            onClick={() => removeArrayItem(index)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name *
            </label>
            <input
              type="text"
              value={edu.institutionName}
              onChange={(e) => updateArrayItem(index, "institutionName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree *
            </label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateArrayItem(index, "degree", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={edu.start}
                onChange={(e) => updateArrayItem(index, "start", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={edu.end}
                onChange={(e) => updateArrayItem(index, "end", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={edu.description}
              onChange={(e) => updateArrayItem(index, "description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your education details"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const SkillsInfoForm = ({ skillsInfo, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
      <button
        onClick={() => addArrayItem({ skillName: "" })}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Skill
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skillsInfo.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={skill.skillName}
            onChange={(e) => updateArrayItem(index, "skillName", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter skill name"
          />
          {skillsInfo.length > 1 && (
            <button
              onClick={() => removeArrayItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Resize observer hook
const useResizeObserver = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useCallback((element) => {
    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });
      resizeObserver.observe(element);
      return () => resizeObserver.disconnect();
    }
  }, []);
  return { ...size, ref };
};

const BuildResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeDownloadRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const { width: previewWidth, ref: previewContainerRef } = useResizeObserver();

  const [resumeData, setResumeData] = useState({
    title: "Professional Resume",
    color: "#3B82F6",
    thumbnail: "",
    fullName: "",
    email: "",
    designation: "",
    summary: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    previewUrl: "",
    website: "",
    workExperience: [{
      companyName: "",
      jobTitle: "",
      role: "",
      start: "",
      end: "",
      description: "",
    }],
    education: [{
      institutionName: "",
      degree: "",
      start: "",
      end: "",
      description: "",
    }],
    skills: [{ skillName: "" }],
  });

  const calculateCompletion = () => {
    let completedFields = 0;
    let totalFields = 0;

    // Basic Info
    const baseFields = ["title", "fullName", "email", "designation", "summary", "phone"];
    baseFields.forEach((field) => {
      totalFields++;
      if (resumeData[field] && resumeData[field].toString().trim() !== "") {
        completedFields++;
      }
    });

    // Work Experience
    resumeData.workExperience.forEach((exp) => {
      const workFields = ["companyName", "jobTitle", "role", "start", "end"];
      totalFields += workFields.length;
      workFields.forEach((field) => {
        if (exp[field] && exp[field].toString().trim() !== "") completedFields++;
      });
    });

    // Education
    resumeData.education.forEach((edu) => {
      const eduFields = ["institutionName", "degree", "start", "end"];
      totalFields += eduFields.length;
      eduFields.forEach((field) => {
        if (edu[field] && edu[field].toString().trim() !== "") completedFields++;
      });
    });

    // Skills
    resumeData.skills.forEach((skill) => {
      totalFields += 1;
      if (skill.skillName && skill.skillName.toString().trim() !== "") completedFields++;
    });

    const percentage = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
    setCompletionPercentage(percentage);
    return percentage;
  };

  useEffect(() => {
    calculateCompletion();
  }, [resumeData]);

  const validateAndNext = () => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData;
        if (!fullName.trim()) errors.push("Full Name is required");
        if (!designation.trim()) errors.push("Designation is required");
        if (!summary.trim()) errors.push("Summary is required");
        break;
      }
      case "contact-info": {
        const { email, phone } = resumeData;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
          errors.push("Valid email is required");
        }
        if (!phone.trim() || !/^\d{10}$/.test(phone)) {
          errors.push("Valid 10-digit phone number is required");
        }
        break;
      }
      case "work-experience": {
        resumeData.workExperience.forEach(({ companyName, jobTitle, role, start, end }, index) => {
          if (!companyName?.trim()) errors.push(`Company Name is required in experience ${index + 1}`);
          if (!jobTitle?.trim()) errors.push(`Job Title is required in experience ${index + 1}`);
          if (!role?.trim()) errors.push(`Role is required in experience ${index + 1}`);
          if (!start || !end) errors.push(`Start and End dates are required in experience ${index + 1}`);
        });
        break;
      }
      case "education-info": {
        resumeData.education.forEach(({ institutionName, degree, start, end }, index) => {
          if (!institutionName?.trim()) errors.push(`Institution is required in education ${index + 1}`);
          if (!degree?.trim()) errors.push(`Degree is required in education ${index + 1}`);
          if (!start || !end) errors.push(`Start and End dates are required in education ${index + 1}`);
        });
        break;
      }
      case "skills": {
        resumeData.skills.forEach(({ skillName }, index) => {
          if (!skillName?.trim()) errors.push(`Skill name is required in skill ${index + 1}`);
        });
        break;
      }
      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    setErrorMsg("");
    goToNextStep();
  };

  const goToNextStep = () => {
    const pages = ["profile-info", "contact-info", "work-experience", "education-info", "skills"];
    
    if (currentPage === "skills") {
      setOpenPreviewModal(true);
      return;
    }

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    const pages = ["profile-info", "contact-info", "work-experience", "education-info", "skills"];

    if (currentPage === "profile-info") {
      navigate("/dashboard");
      return;
    }

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);
      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updateSection = (key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const fetchResumeDetailsById = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axiosInstance.get(`/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resumeInfo = response.data.resume;
      console.log("Resume info:", resumeInfo);

      if (resumeInfo) {
        // Handle profile info - it's an array according to your backend
        const profile = resumeInfo.Profileinfo?.[0] || {};
        
        setResumeData({
          title: resumeInfo.title || "Professional Resume",
          color: resumeInfo.color || "#3B82F6",
          thumbnail: resumeInfo.thumbnail || "",
          fullName: profile.fullName || "",
          email: profile.email || "",
          designation: profile.designation || "",
          summary: profile.summary || "",
          phone: profile.phone || "",
          location: profile.location || "",
          linkedin: profile.linkedin || "",
          github: profile.github || "",
          previewUrl: profile.previewUrl || "",
          website: profile.website || "",
          workExperience: resumeInfo.WorkExperience?.map((job) => ({
            companyName: job.companyName || "",
            jobTitle: job.jobTitle || "",
            role: job.role || "",
            start: job.start ? new Date(job.start).toISOString().split('T')[0] : "",
            end: job.end ? new Date(job.end).toISOString().split('T')[0] : "",
            description: job.description || "",
          })) || [{
            companyName: "",
            jobTitle: "",
            role: "",
            start: "",
            end: "",
            description: "",
          }],
          education: resumeInfo.Education?.map((edu) => ({
            institutionName: edu.institutionName || "",
            degree: edu.degree || "",
            start: edu.start ? new Date(edu.start).toISOString().split('T')[0] : "",
            end: edu.end ? new Date(edu.end).toISOString().split('T')[0] : "",
            description: edu.description || "",
          })) || [{
            institutionName: "",
            degree: "",
            start: "",
            end: "",
            description: "",
          }],
          skills: resumeInfo.Skill?.map((s) => ({
            skillName: s.skillName || "",
          })) || [{ skillName: "" }],
        });
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      setErrorMsg("Failed to fetch resume data");
    } finally {
      setIsLoading(false);
    }
  };

  const saveResume = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      
      const token = localStorage.getItem("token");
      const isNewResume = resumeId === 'new';
      
      const endpoint = isNewResume ? '/resume/create' : `/resume/updateResume/${resumeId}`;
      const method = isNewResume ? 'post' : 'put';
      
      const response = await axiosInstance[method](endpoint, resumeData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        setSuccessMsg("Resume saved successfully!");
        
        // If it's a new resume, navigate to the edit page with the new ID
        if (isNewResume && response.data.resume?.id) {
          navigate(`/dashboard/resume/${response.data.resume.resumeId}`);
        }
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      setErrorMsg(error.response?.data?.message || "Failed to save resume");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={{
              fullName: resumeData.fullName,
              designation: resumeData.designation,
              summary: resumeData.summary,
            }}
            updateSection={updateSection}
            onNext={validateAndNext}
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={{
              email: resumeData.email,
              phone: resumeData.phone,
              location: resumeData.location,
              linkedin: resumeData.linkedin,
              github: resumeData.github,
              website: resumeData.website,
            }}
            updateSection={updateSection}
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData.workExperience}
            updateArrayItem={(index, key, value) => updateArrayItem("workExperience", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) => removeArrayItem("workExperience", index)}
          />
        );
      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData.education}
            updateArrayItem={(index, key, value) => updateArrayItem("education", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );
      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData.skills}
            updateArrayItem={(index, key, value) => updateArrayItem("skills", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (resumeId && resumeId !== 'new') {
      fetchResumeDetailsById();
    }
  }, [resumeId]);

  const getPageTitle = () => {
    switch (currentPage) {
      case "profile-info": return "Profile Information";
      case "contact-info": return "Contact Information";
      case "work-experience": return "Work Experience";
      case "education-info": return "Education";
      case "skills": return "Skills";
      default: return "Resume Builder";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-white to-blue-50 rounded-2xl py-6 px-8 mb-8 shadow-sm">
          <div className="flex-1">
            <TitleInput
              title={resumeData.title}
              setTitle={(value) => updateSection("title", value)}
            />
            <div className="mt-2 text-sm text-gray-600">
              Progress: {completionPercentage}% complete
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={saveResume}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            
            <button
              onClick={() => setOpenPreviewModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download size={16} />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {["Profile", "Contact", "Experience", "Education", "Skills"].map((step, index) => {
              const pages = ["profile-info", "contact-info", "work-experience", "education-info", "skills"];
              const isActive = currentPage === pages[index];
              const isCompleted = pages.indexOf(currentPage) > index;
              
              return (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${isActive ? 'bg-blue-500 text-white' : 
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                    {step}
                  </span>
                  {index < 4 && (
                    <div className={`w-8 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Error Messages */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errorMsg}</p>
            </div>
          )}

          {/* Success Messages */}
          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{successMsg}</p>
            </div>
          )}

          {/* Form Content */}
          <div className="mb-8">
            {renderForm()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="flex gap-3">
              <button
                onClick={saveResume}
                disabled={isLoading}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                Save Progress
              </button>
              
              <button
                onClick={validateAndNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {currentPage === "skills" ? "Preview" : "Next"}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {openPreviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Resume Preview</h2>
                  <button
                    onClick={() => setOpenPreviewModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
                  {/* Resume Preview Content */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center border-b pb-4">
                      <h1 className="text-3xl font-bold text-gray-800">{resumeData.fullName || "Your Name"}</h1>
                      <p className="text-xl text-gray-600 mt-1">{resumeData.designation || "Your Designation"}</p>
                      <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                        {resumeData.email && <span>{resumeData.email}</span>}
                        {resumeData.phone && <span>{resumeData.phone}</span>}
                        {resumeData.location && <span>{resumeData.location}</span>}
                      </div>
                    </div>

                    {/* Summary */}
                    {resumeData.summary && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
                        <p className="text-gray-700">{resumeData.summary}</p>
                      </div>
                    )}

                    {/* Work Experience */}
                    {resumeData.workExperience.some(exp => exp.companyName) && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Work Experience</h2>
                        <div className="space-y-4">
                          {resumeData.workExperience.map((exp, index) => (
                            exp.companyName && (
                              <div key={index} className="border-l-2 border-blue-500 pl-4">
                                <h3 className="font-semibold text-gray-800">{exp.jobTitle}</h3>
                                <p className="text-gray-600">{exp.companyName} • {exp.role}</p>
                                <p className="text-sm text-gray-500">{exp.start} - {exp.end}</p>
                                {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.some(edu => edu.institutionName) && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Education</h2>
                        <div className="space-y-4">
                          {resumeData.education.map((edu, index) => (
                            edu.institutionName && (
                              <div key={index} className="border-l-2 border-green-500 pl-4">
                                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.institutionName}</p>
                                <p className="text-sm text-gray-500">{edu.start} - {edu.end}</p>
                                {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.some(skill => skill.skillName) && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            skill.skillName && (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {skill.skillName}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    {(resumeData.linkedin || resumeData.github || resumeData.website) && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Links</h2>
                        <div className="space-y-1">
                          {resumeData.linkedin && (
                            <p className="text-blue-600 hover:underline">
                              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn: {resumeData.linkedin}
                              </a>
                            </p>
                          )}
                          {resumeData.github && (
                            <p className="text-blue-600 hover:underline">
                              <a href={resumeData.github} target="_blank" rel="noopener noreferrer">
                                GitHub: {resumeData.github}
                              </a>
                            </p>
                          )}
                          {resumeData.website && (
                            <p className="text-blue-600 hover:underline">
                              <a href={resumeData.website} target="_blank" rel="noopener noreferrer">
                                Website: {resumeData.website}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setOpenPreviewModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={saveResume}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    Save Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildResume;