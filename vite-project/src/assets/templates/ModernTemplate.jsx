import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
} from "lucide-react";

const ModernTemplate = ({ data, accentColor = "#3B82F6" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr || !dateStr.includes("-")) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">

      {/* ================= HEADER ================= */}
      <header
        className="px-10 py-12 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-4xl font-semibold mb-4">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm opacity-95">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={14} />
              <span className="text-xs break-all">
                {data.personal_info.linkedin.replace(/^https?:\/\//, "")}
              </span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span className="text-xs break-all">
                {data.personal_info.website.replace(/^https?:\/\//, "")}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="px-10 py-8">

        {/* SUMMARY */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-4">
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-medium">
                        {exp.position}
                      </h3>
                      <p
                        className="text-sm font-medium"
                        style={{ color: accentColor }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current
                        ? "Present"
                        : formatDate(exp.end_date)}
                    </span>
                  </div>

                  {exp.description && (
                    <div className="text-gray-700 text-sm mt-2 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.project?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-4">
              Projects
            </h2>

            <div className="space-y-5">
              {data.project.map((project, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="font-medium">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-gray-700 mt-1">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-8">

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wide mb-4">
                Education
              </h2>

              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-medium">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }}>
                      {edu.institution}
                    </p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SKILLS */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wide mb-4">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white rounded-full"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
