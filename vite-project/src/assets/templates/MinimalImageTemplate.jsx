import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor = "#3B82F6" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr || !dateStr.includes("-")) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      <div className="grid grid-cols-3">

        {/* Image */}
        <div className="col-span-1 py-10 flex justify-center">
          {data.personal_info?.image && (
            <img
              src={
                typeof data.personal_info.image === "string"
                  ? data.personal_info.image
                  : URL.createObjectURL(data.personal_info.image)
              }
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
              style={{ backgroundColor: accentColor + "70" }}
            />
          )}
        </div>

        {/* Name + Title */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold tracking-widest text-zinc-700 relative inline-block">
            {data.personal_info?.full_name || "Your Name"}
            <span
              className="absolute left-0 -bottom-1 h-1 w-12"
              style={{ backgroundColor: accentColor }}
            />
          </h1>
          <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest mt-2">
            {data.personal_info?.profession || "Profession"}
          </p>
        </div>

        {/* Sidebar */}
        <aside
          className="col-span-1 border-r p-6 pt-0"
          style={{ backgroundColor: accentColor + "10" }}
        >
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest mb-3">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  {data.personal_info.phone}
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />
                  {data.personal_info.email}
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  {data.personal_info.location}
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest mb-3">
                EDUCATION
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest mb-3">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="col-span-2 p-8 pt-0">
          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_current
                          ? "Present"
                          : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        {exp.description.split("\n").map((line, j) => (
                          <li key={j}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project?.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="space-y-4">
                {data.project.map((project, i) => (
                  <div key={i}>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm" style={{ color: accentColor }}>
                      {project.type}
                    </p>
                    {project.description && (
                      <ul className="list-disc list-inside text-sm mt-2">
                        {project.description.split("\n").map((line, j) => (
                          <li key={j}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
