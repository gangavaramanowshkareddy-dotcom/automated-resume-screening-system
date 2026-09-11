import { useEffect, useState } from "react";
import { BriefcaseBusiness, Plus, Search, X } from "lucide-react";

function Jobs() {
  const defaultJobs = [
    {
      title: "AI / ML Engineer",
      skills: "Python, Machine Learning, SQL",
      experience: "0–2 years",
      candidates: 0,
      status: "Active",
    },
    {
      title: "Python Developer",
      skills: "Python, FastAPI, SQL",
      experience: "0–2 years",
      candidates: 0,
      status: "Active",
    },
  ];

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("smart_screen_jobs");

    if (savedJobs) {
      try {
        return JSON.parse(savedJobs);
      } catch {
        return defaultJobs;
      }
    }

    return defaultJobs;
  });

  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    experience: "",
  });

  useEffect(() => {
    localStorage.setItem("smart_screen_jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreateJob = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.skills.trim() ||
      !formData.experience.trim()
    ) {
      return;
    }

    const newJob = {
      title: formData.title.trim(),
      skills: formData.skills.trim(),
      experience: formData.experience.trim(),
      candidates: 0,
      status: "Active",
    };

    setJobs((previous) => [...previous, newJob]);

    setFormData({
      title: "",
      skills: "",
      experience: "",
    });

    setShowForm(false);
  };

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();

    return (
      job.title.toLowerCase().includes(search) ||
      job.skills.toLowerCase().includes(search) ||
      job.experience.toLowerCase().includes(search)
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Jobs</h1>
          <p>
            Manage your job descriptions and recruitment requirements.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={17} />
          Create Job
        </button>
      </div>

      <div className="jobs-toolbar">
        <div className="search-box">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="jobs-card">
        <div className="jobs-card-header">
          <div>
            <h2>Job Descriptions</h2>
            <p>Manage positions available for resume screening.</p>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="jobs-table-wrapper">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Required Skills</th>
                  <th>Experience</th>
                  <th>Candidates</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job, index) => (
                  <tr key={`${job.title}-${index}`}>
                    <td>
                      <div className="job-title">
                        <div className="job-icon">
                          <BriefcaseBusiness size={17} />
                        </div>

                        <strong>{job.title}</strong>
                      </div>
                    </td>

                    <td>{job.skills}</td>

                    <td>{job.experience}</td>

                    <td>{job.candidates}</td>

                    <td>
                      <span className="status-badge">
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <BriefcaseBusiness size={35} />

            <h3>No jobs found</h3>

            <p>
              Create a job to start screening candidates.
            </p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="job-modal">
            <div className="modal-header">
              <div>
                <h2>Create New Job</h2>

                <p>
                  Add the recruitment requirements for this position.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateJob}>
              <div className="form-field">
                <label>Job Title</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI / ML Engineer"
                />
              </div>

              <div className="form-field">
                <label>Required Skills</label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. Python, Machine Learning, SQL"
                />
              </div>

              <div className="form-field">
                <label>Experience</label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 0–2 years"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  <Plus size={17} />
                  Save Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;