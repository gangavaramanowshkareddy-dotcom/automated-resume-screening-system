import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Users,
  ScanSearch,
  TrendingUp,
  CheckCircle,
  XCircle,
  Upload,
  UserCheck,
  UserX,
  Trophy,
  ArrowRight,
} from "lucide-react";
import apiClient from "../api/client";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    jobTitle: "",
    totalJobs: 0,
    totalCandidates: 0,
    screenings: 0,
    averageScore: null,
    shortlisted: 0,
    rejected: 0,
    candidates: [],
    topCandidate: null,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Dashboard data comes from backend only.
      // No localStorage is used for Dashboard data.
      const response = await apiClient.get("/api/dashboard/overview");

      const data = response.data || {};
      const candidates = Array.isArray(data.candidates)
        ? data.candidates
        : [];

      const scoredCandidates = candidates.filter(
        (candidate) => typeof candidate.final_score === "number"
      );

      const totalScore = scoredCandidates.reduce(
        (sum, candidate) => sum + candidate.final_score,
        0
      );

      const averageScore =
        scoredCandidates.length > 0
          ? Math.round(totalScore / scoredCandidates.length)
          : null;

      const shortlisted = candidates.filter((candidate) => {
        const decision = String(
          candidate.decision || ""
        ).toUpperCase();

        return (
          decision === "SHORTLIST" ||
          decision === "SHORTLISTED"
        );
      }).length;

      const rejected = candidates.filter((candidate) => {
        const decision = String(
          candidate.decision || ""
        ).toUpperCase();

        return (
          decision === "REJECT" ||
          decision === "REJECTED"
        );
      }).length;

      const topCandidate =
        scoredCandidates.length > 0
          ? [...scoredCandidates].sort(
              (a, b) => b.final_score - a.final_score
            )[0]
          : null;

      setDashboardData({
        jobTitle: data.job_title || "",
        totalJobs:
          typeof data.total_jobs === "number"
            ? data.total_jobs
            : 0,
        totalCandidates: candidates.length,
        screenings:
          typeof data.total_screenings === "number"
            ? data.total_screenings
            : 0,
        averageScore,
        shortlisted,
        rejected,
        candidates: candidates.slice(0, 5),
        topCandidate,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);

      setDashboardData({
        jobTitle: "",
        totalJobs: 0,
        totalCandidates: 0,
        screenings: 0,
        averageScore: null,
        shortlisted: 0,
        rejected: 0,
        candidates: [],
        topCandidate: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const {
    jobTitle,
    totalJobs,
    totalCandidates,
    screenings,
    averageScore,
    shortlisted,
    rejected,
    candidates,
    topCandidate,
  } = dashboardData;

  return (
    <div className="dashboard-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            OVERVIEW
          </span>

          <h1>Dashboard</h1>

          <p>
            Monitor your resume screening activity and
            candidate results.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/screening")}
        >
          <ScanSearch size={17} />
          New Screening
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <BriefcaseBusiness size={21} />
          </div>

          <div>
            <span>Total Jobs</span>
            <strong>{totalJobs}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <Users size={21} />
          </div>

          <div>
            <span>Total Candidates</span>
            <strong>{totalCandidates}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <ScanSearch size={21} />
          </div>

          <div>
            <span>Screenings</span>
            <strong>{screenings}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <TrendingUp size={21} />
          </div>

          <div>
            <span>Average Score</span>
            <strong>
              {averageScore !== null
                ? `${averageScore}%`
                : "—"}
            </strong>
          </div>
        </div>

      </div>

      {/* SCREENING FUNNEL */}
      <div className="dashboard-section screening-funnel-section">

        <div className="section-heading">
          <h2>Screening Funnel</h2>

          <p>
            Overview of the latest resume screening process
            {jobTitle ? ` for ${jobTitle}` : ""}.
          </p>
        </div>

        <div className="screening-funnel">

          {/* UPLOADED */}
          <div className="funnel-step">
            <div className="funnel-icon">
              <Upload size={20} />
            </div>

            <div className="funnel-content">
              <span>Resumes Uploaded</span>
              <strong>{totalCandidates}</strong>
            </div>
          </div>

          <ArrowRight
            className="funnel-arrow"
            size={20}
          />

          {/* SCREENED */}
          <div className="funnel-step">
            <div className="funnel-icon">
              <ScanSearch size={20} />
            </div>

            <div className="funnel-content">
              <span>Resumes Screened</span>
              <strong>{totalCandidates}</strong>
            </div>
          </div>

          <ArrowRight
            className="funnel-arrow"
            size={20}
          />

          {/* SHORTLISTED */}
          <div className="funnel-step">
            <div className="funnel-icon">
              <UserCheck size={20} />
            </div>

            <div className="funnel-content">
              <span>Shortlisted</span>
              <strong>{shortlisted}</strong>
            </div>
          </div>

          <ArrowRight
            className="funnel-arrow"
            size={20}
          />

          {/* REJECTED */}
          <div className="funnel-step">
            <div className="funnel-icon">
              <UserX size={20} />
            </div>

            <div className="funnel-content">
              <span>Rejected</span>
              <strong>{rejected}</strong>
            </div>
          </div>

        </div>
      </div>

      {/* TOP CANDIDATE */}
      <div className="dashboard-section top-candidate-section">

        <div className="section-heading">
          <h2>Top Candidate</h2>

          <p>
            Highest-scoring candidate from the latest
            screening.
          </p>
        </div>

        {topCandidate ? (
          <div className="top-candidate-card">

            <div className="top-candidate-icon">
              <Trophy size={24} />
            </div>

            <div className="top-candidate-info">
              <span className="top-candidate-label">
                TOP MATCH
              </span>

              <h3>
                {topCandidate.name ||
                  "Unnamed Candidate"}
              </h3>

              <p>
                {topCandidate.email ||
                  "No email available"}
              </p>
            </div>

            <div className="top-candidate-score">
              <span>Match Score</span>

              <strong>
                {Math.round(
                  topCandidate.final_score
                )}%
              </strong>
            </div>

          </div>
        ) : (
          <div className="empty-state">
            <Trophy size={30} />

            <h3>No screening results yet</h3>

            <p>
              Run a resume screening to see the top
              candidate here.
            </p>
          </div>
        )}

      </div>

      {/* SCREENING OVERVIEW */}
      <div className="dashboard-grid">

        <div className="dashboard-section">

          <div className="section-heading">
            <h2>Screening Overview</h2>

            <p>
              Current candidate distribution.
            </p>
          </div>

          <div className="screening-overview">

            <div className="overview-item">

              <div className="overview-label">
                <span>Shortlisted</span>
                <strong>{shortlisted}</strong>
              </div>

              <div className="overview-bar">
                <div
                  className="overview-bar-fill shortlisted"
                  style={{
                    width:
                      totalCandidates > 0
                        ? `${(shortlisted / totalCandidates) * 100}%`
                        : "0%",
                  }}
                />
              </div>

            </div>

            <div className="overview-item">

              <div className="overview-label">
                <span>Rejected</span>
                <strong>{rejected}</strong>
              </div>

              <div className="overview-bar">
                <div
                  className="overview-bar-fill rejected"
                  style={{
                    width:
                      totalCandidates > 0
                        ? `${(rejected / totalCandidates) * 100}%`
                        : "0%",
                  }}
                />
              </div>

            </div>

          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="dashboard-section">

          <div className="section-heading">
            <h2>Recent Activity</h2>

            <p>
              Latest screened candidates.
            </p>
          </div>

          {loading ? (
            <div className="empty-state">
              Loading candidates...
            </div>
          ) : candidates.length === 0 ? (
            <div className="empty-state">
              <Users size={30} />

              <h3>No candidates yet</h3>

              <p>
                Screen resumes to see candidate activity
                here.
              </p>
            </div>
          ) : (
            <div className="activity-list">

              {candidates.map((candidate, index) => {

                const decision = String(
                  candidate.decision || ""
                ).toUpperCase();

                const isShortlisted =
                  decision === "SHORTLIST" ||
                  decision === "SHORTLISTED";

                return (
                  <div
                    className="activity-item"
                    key={
                      candidate.candidate_id ||
                      candidate.email ||
                      index
                    }
                  >

                    <div>
                      <div className="activity-name">
                        {candidate.name ||
                          "Unnamed Candidate"}
                      </div>

                      <div className="activity-job">
                        {jobTitle ||
                          "Resume Screening"}
                      </div>
                    </div>

                    <div className="activity-score">
                      {typeof candidate.final_score ===
                      "number"
                        ? `${Math.round(
                            candidate.final_score
                          )}%`
                        : "—"}
                    </div>

                    <span
                      className={`activity-status ${
                        isShortlisted
                          ? "activity-status-success"
                          : "activity-status-rejected"
                      }`}
                    >
                      {isShortlisted ? (
                        <>
                          <CheckCircle size={13} />
                          Shortlisted
                        </>
                      ) : (
                        <>
                          <XCircle size={13} />
                          Rejected
                        </>
                      )}
                    </span>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;