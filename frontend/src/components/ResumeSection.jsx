import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

// Progress Bar Component
export const Progress = ({ progress, color }) => (
  <div className="w-20 h-2 rounded-full bg-gray-200">
    <div
      className="h-full rounded-full transition-all"
      style={{ width: `${progress * 20}%`, backgroundColor: color }}
    />
  </div>
)

// Action Link Component
export const ActionLink = ({ icon, link, bgColor }) => (
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 flex items-center justify-center rounded-full" style={{ backgroundColor: bgColor }}>
      {icon}
    </div>
    <p className="text-sm font-medium underline cursor-pointer break-all text-gray-600 hover:text-emerald-600 transition-colors">
      {link}
    </p>
  </div>
)


// Contact Info Component
export const ContactInfo = ({ icon, iconBG, value }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: iconBG }}>
      {icon}
    </div>
    <p className="flex-1 text-sm font-medium break-all text-gray-700">{value}</p>
  </div>
)

// Education Info Component
export const EducationInfo = ({ degree, institution, duration }) => (
  <div className="mb-5">
    <h3 className="text-base font-semibold pb-2 text-gray-900">{degree}</h3>
    <p className="text-sm text-gray-700 font-medium">{institution}</p>
    <p className="text-xs text-gray-500 font-medium italic mt-1">{duration}</p>
  </div>
)

// Shared Block Component for Skills / Languages
const InfoBlock = ({ label, progress, accentColor }) => (
  <div className="flex items-center justify-between mb-3">
    <p className="text-sm font-semibold text-gray-900">{label}</p>
    {progress > 0 && <Progress progress={(progress / 100) * 5} color={accentColor} />}
  </div>
)


// Skill Section
export const SkillSection = ({ skills }) => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-5">
    {skills.map((skill, idx) => (
      <InfoBlock key={idx} label={skill.name}   />
    ))}
  </div>
)


// Work Experience Component
export const WorkExperience = ({ company, role, duration, durationColor, description }) => (
  <div className="mb-6">
    <div className="flex items-start justify-between mb-2">
      <div>
        <h3 className="text-base font-semibold pb-2 text-gray-900">{company}</h3>
        <p className="text-base font-medium text-gray-700">{role}</p>
      </div>
      <p className="text-sm font-bold italic" style={{ color: durationColor }}>{duration}</p>
    </div>
    <p className="text-sm text-gray-600 font-medium leading-relaxed">{description}</p>
  </div>
)
