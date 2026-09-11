import React, { useEffect, useState } from "react";
import apiClient from "../api/client";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError("");

      const jobId = localStorage.getItem("last_screening_job_id");
      const token = localStorage.getItem("access_token");

      if (!jobId) {
        setCandidates([]);
        setLoading(false);
        return;
      }

      const response = await apiClient.get(
        `/api/jobs/${jobId}/candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data || {};
      const jobTitle = data.job_title || "—";

      const candidateList = (data.candidates || []).map((candidate) => ({
        ...candidate,
        job: jobTitle,
      }));

      setCandidates(candidateList);
    } catch (err) {
      console.error("Failed to load candidates:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to load candidates."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const name = candidate.name || "";
    const email = candidate.email || "";

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());

    const decision = String(candidate.decision || "").toUpperCase();

    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Shortlisted" && decision === "SHORTLIST") ||
      (statusFilter === "Rejected" && decision === "REJECT");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Candidates</h1>
          <p>
            View and manage candidates screened by SmartScreen AI.
          </p>
        </div>
      </div>

      <div className="candidate-topbar">
        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select defaultValue="All Jobs">
          <option>All Jobs</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Shortlisted</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="candidates-card">
        <div className="candidates-card-header">
          <h2>All Candidates</h2>
          <span>{filteredCandidates.length} candidates</span>
        </div>

        {loading ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            Loading candidates...
          </div>
        ) : error ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            No candidates found.
          </div>
        ) : (
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Applied Position</th>
                <th>Match Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.map((candidate) => {
                const decision = String(
                  candidate.decision || ""
                ).toUpperCase();

                return (
                  <tr key={candidate.candidate_id}>
                    <td>
                      <div className="candidate-info">
                        <div className="candidate-avatar">
                          {(candidate.name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {candidate.name || "Unknown"}
                          </strong>

                          <small>
                            {candidate.email || "—"}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>{candidate.job}</td>

                    <td>
                      <strong>
                        {candidate.final_score !== null &&
                        candidate.final_score !== undefined
                          ? `${Math.round(
                              candidate.final_score
                            )}%`
                          : "—"}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={
                          decision === "SHORTLIST"
                            ? "status shortlisted"
                            : decision === "REJECT"
                            ? "status rejected"
                            : "status"
                        }
                      >
                        {decision === "SHORTLIST"
                          ? "Shortlisted"
                          : decision === "REJECT"
                          ? "Rejected"
                          : "Processing"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-button"
                        onClick={() =>
                          setSelectedCandidate(candidate)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {selectedCandidate && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            style={{
              background: "#ffffff",
              width: "100%",
              maxWidth: "700px",
              maxHeight: "85vh",
              overflowY: "auto",
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>
                  {selectedCandidate.name || "Unknown Candidate"}
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#6b7280",
                  }}
                >
                  {selectedCandidate.job || "—"}
                </p>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
              }}
            >
              <div>
                <strong>Email</strong>
                <p>{selectedCandidate.email || "—"}</p>
              </div>

              <div>
                <strong>Phone</strong>
                <p>{selectedCandidate.phone || "—"}</p>
              </div>

              <div>
                <strong>Location</strong>
                <p>{selectedCandidate.location || "—"}</p>
              </div>

              <div>
                <strong>Education</strong>
                <p>{selectedCandidate.education || "—"}</p>
              </div>

              <div>
                <strong>Match Score</strong>
                <p>
                  {selectedCandidate.final_score !== null &&
                  selectedCandidate.final_score !== undefined
                    ? `${Math.round(
                        selectedCandidate.final_score
                      )}%`
                    : "—"}
                </p>
              </div>

              <div>
                <strong>Status</strong>
                <p>
                  {String(
                    selectedCandidate.decision || ""
                  ).toUpperCase() === "SHORTLIST"
                    ? "Shortlisted"
                    : String(
                        selectedCandidate.decision || ""
                      ).toUpperCase() === "REJECT"
                    ? "Rejected"
                    : "Processing"}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <strong>Skills</strong>
              <p>
                {Array.isArray(selectedCandidate.skills)
                  ? selectedCandidate.skills.join(", ")
                  : selectedCandidate.skills || "—"}
              </p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <strong>Experience</strong>
              <p>
                {selectedCandidate.experience || "—"}
              </p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <strong>Projects</strong>
              <p>
                {selectedCandidate.projects || "—"}
              </p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <strong>Certifications</strong>
              <p>
                {selectedCandidate.certifications || "—"}
              </p>
            </div>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="view-button"
                onClick={() => setSelectedCandidate(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Candidates;