const prisma = require("../config/PrismaClient");

const createResume = async (req, res) => {
  try {
    const {
      title,
      color = "",
      thumbnail = "",
      fullName = "",
      email = "",
      designation = "",
      summary = "",
      phone = "",
      location = "",
      linkedin = "",
      github = "",
      previewUrl = "",
      website = "",
      workExperience = [],
      education = [],
      skills = [],
    } = req.body;

    const userId = req.user.userId;
    const newResume = await prisma.resume.create({
      data: {
        title,
        color,
        thumbnail,
        user: {
          connect: { id: userId },
        },

        //  a default Profileinfo
        Profileinfo: {
          create: {
            fullName: fullName,
            email: email,
            designation: designation,
            summary: summary,
            phone: phone,
            location: location,
            linkedin: linkedin,
            github: github,
            previewUrl: previewUrl,
            website: website,
          },
        },

        //  multiple WorkExperience entries
        WorkExperience: {
          create: workExperience.map((job) => ({
            companyName: job.companyName || "",
            jobTitle: job.jobTitle || "",
            role: job.role || "",
            start: job.start ? new Date(job.start) : new Date(),
            end: job.end ? new Date(job.end) : new Date(),
            description: job.description || "",
          })),
        },

        //  multiple Education entries
        Education: {
          create: education.map((edu) => ({
            institutionName: edu.institutionName || "",
            degree: edu.degree || "",
            start: edu.start ? new Date(edu.start) : new Date(),
            end: edu.end ? new Date(edu.end) : new Date(),
            description: edu.description || "",
          })),
        },

        //  multiple Skill entries
        Skill: {
          create: skills.map((s) => ({
            skillName: s.skillName || "",
          })),
        },
      },
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get all resume for all users
const getUserResume = async (req, res) => {
  try {
    const resume = await prisma.resume.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      // include:{
      //   profileinfo,
      //   workExperience,
      //   education,
      //   skill
      // }
    });
    if (!resume) {
      return res.status(404).json({ message: "No resume found for user" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get resume by id
const getResumeById = async (req, res) => {
  try {
    const resumeId = req.params.id; 
    console.log("dfsssssssssssssssssssssssssssssssssssssss", resumeId)
    const userId = req.user.userId;

    if (!resumeId || isNaN(resumeId)) {
      return res.status(400).json({ message: "Invalid resume ID" });
    }

    const resume = await prisma.resume.findFirst({
      where: {
        resumeId: Number(resumeId),  
      },
      include: {
        Profileinfo: true,
        WorkExperience: true,
        Education: true,
        Skill: true,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: "No resume found for this user" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId;

    const {
      title,
      color = "",
      thumbnail = "",
      fullName = "",
      email = "",
      designation = "",
      summary = "",
      phone = "",
      location = "",
      linkedin = "",
      github = "",
      previewUrl = "",
      website = "",
      workExperience = [],
      education = [],
      skills = [],
    } = req.body;

    console.log("Resume ID:", resumeId);
    console.log("Update Data:", req.body);

    // Ensure resume exists and belongs to the user
    const existingResume = await prisma.resume.findFirst({
      where: {
        resumeId: Number(resumeId),
        userId,
      },
      include: {
        Profileinfo: true,
        WorkExperience: true,
        Education: true,
        Skill: true,
      },
    });

    if (!existingResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Delete old nested records
    await prisma.profileinfo.deleteMany({ where: { resumeId: Number(resumeId) } });
    await prisma.workExperience.deleteMany({ where: { resumeId: Number(resumeId) } });
    await prisma.education.deleteMany({ where: { resumeId: Number(resumeId) } });
    await prisma.skill.deleteMany({ where: { resumeId: Number(resumeId) } });

    // Update the resume and re-create nested data
    const updatedResume = await prisma.resume.update({
      where: { resumeId: Number(resumeId) },
      data: {
        title,
        color,
        thumbnail,
        Profileinfo: {
          create: {
            fullName,
            email,
            designation,
            summary,
            phone,
            location,
            linkedin,
            github,
            previewUrl,
            website,
          },
        },
        WorkExperience: {
          create: workExperience.map((job) => ({
            companyName: job.companyName || "",
            jobTitle: job.jobTitle || "",
            role: job.role || "",
            start: job.start ? new Date(job.start) : new Date(),
            end: job.end ? new Date(job.end) : new Date(),
            description: job.description || "",
          })),
        },
        Education: {
          create: education.map((edu) => ({
            institutionName: edu.institutionName || "",
            degree: edu.degree || "",
            start: edu.start ? new Date(edu.start) : new Date(),
            end: edu.end ? new Date(edu.end) : new Date(),
            description: edu.description || "",
          })),
        },
        Skill: {
          create: skills.map((s) => ({
            skillName: s.skillName || "",
          })),
        },
      },
    });

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


module.exports = {
  createResume,
  getUserResume,
  getResumeById,
  updateResume,
};
