import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
} from "lucide-react";

import ResumePreview from "../components/ResumePreview";
import PersonalInfoForm from "../components/PersonalInfoForm";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import { dummyResumeData } from "../assets/assets";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";

function ResumeBuilder() {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

  return (
    <div>
      {/* Top nav */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left panel */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative overflow-hidden">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200" />
              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{
                  width: `${sections.length > 1
                      ? (activeSectionIndex * 100) /
                      (sections.length - 1)
                      : 0
                    }%`,
                }}
              />

              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-2">
                <div className="flex gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-1">
                  {activeSectionIndex > 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => prev - 1)
                      }
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${activeSectionIndex === sections.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Form content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}


                {/* other sections can be added here */}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-7">
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
