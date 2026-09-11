import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Users,
  ScanSearch,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import apiClient from "../api/client";

function Dashboard() {
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
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const jobId = localStorage.getItem("last_screening_job_id");

      if (!jobId) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("access_token");

      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await apiClient.get(
        `/api/jobs/${jobId}/candidates`,
        config
      );

      const data = response.data;

      const candidates = Array.isArray(data.candidates)
        ? data.candidates
        : [];

      const scoredCandidates = candidates.filter(
        (candidate) =>
          typeof candidate.final_score === "number"
      );

      const totalScore = scoredCandidates.reduce(
        (sum, candidate) => sum + candidate.final_score,
        0
      );

      const averageScore =
        scoredCandidates.length > 0
          ? Math.round(totalScore / scoredCandidates.length)
          : null;

      const shortlisted = candidates.filter(
        (candidate) =>
          String(candidate.decision || "").toUpperCase() === "SHORTLIST"
      ).length;

      const rejected = candidates.filter(
        (candidate) =>
          String(candidate.decision || "").toUpperCase() === "REJECT"
      ).length;

      setDashboardData({
        jobTitle: data.job_title || "",
        totalJobs: data.job_title ? 1 : 0,
        totalCandidates: data.total_candidates || candidates.length,
        screenings: data.job_title ? 1 : 0,
        averageScore,
        shortlisted,
        rejected,
        candidates: candidates.slice(0, 5),
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">OVERVIEW</p>

          <h1>Dashboard</h1>

          <p className="page-description">
            Welcome to SmartScreen AI. Manage your recruitment screening
            workflow from here.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => (window.location.href = "/screening")}
        >
          <ScanSearch size={17} />
          New Screening
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <span>Total Jobs</span>
            <strong>
              {loading ? "—" : dashboardData.totalJobs}
            </strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Total Candidates</span>
            <strong>
              {loading ? "—" : dashboardData.totalCandidates}
            </strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <ScanSearch size={20} />
          </div>

          <div>
            <span>Screenings</span>
            <strong>
              {loading ? "—" : dashboardData.screenings}
            </strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <TrendingUp size={20} />
          </div>

          <div>
            <span>Average Score</span>
            <strong>
              {loading
                ? "—"
                : dashboardData.averageScore !== null
                ? `${dashboardData.averageScore}%`
                : "—"}
            </strong>
          </div>
        </div>
      </div>

      {/* Screening Overview */}
      <div className="dashboard-grid">
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Screening Overview</h2>

              <p>
                {dashboardData.jobTitle
                  ? `Latest screening: ${dashboardData.jobTitle}`
                  : "Your latest screening results will appear here."}
              </p>
            </div>
          </div>

          <div className="dashboard-overview">
            <div className="dashboard-overview-row">
              <div>
                <CheckCircle size={18} />
                <span>Shortlisted</span>
              </div>

              <strong>{dashboardData.shortlisted}</strong>
            </div>

            <div className="dashboard-overview-row">
              <div>
                <XCircle size={18} />
                <span>Rejected</span>
              </div>

              <strong>{dashboardData.rejected}</strong>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Recent Activity</h2>

              <p>
                Latest candidates from your screening.
              </p>
            </div>
          </div>

          {dashboardData.candidates.length === 0 ? (
            <div className="empty-state">
              <ScanSearch size={32} />

              <h3>No screening activity yet</h3>

              <p>
                Start a new screening to see candidates and screening
                results here.
              </p>

              <button
                className="secondary-button"
                onClick={() => (window.location.href = "/screening")}
              >
                Start Screening
              </button>
            </div>
          ) : (
            <div className="dashboard-activity-list">
              {dashboardData.candidates.map((candidate, index) => {
                const decision = String(
                  candidate.decision || ""
                ).toUpperCase();

                return (
                  <div
                    className="dashboard-activity-item"
                    key={
                      candidate.candidate_id ||
                      candidate.id ||
                      index
                    }
                  >
                    <div>
                      <strong>
                        {candidate.name ||
                          candidate.candidate_name ||
                          "Unknown Candidate"}
                      </strong>

                      <span>
                        {candidate.final_score !== null &&
                        candidate.final_score !== undefined
                          ? `Score: ${candidate.final_score}%`
                          : "Processing"}
                      </span>
                    </div>

                    <span
                      className={`dashboard-status ${
                        decision === "SHORTLIST"
                          ? "shortlisted"
                          : decision === "REJECT"
                          ? "rejected"
                          : "pending"
                      }`}
                    >
                      {decision === "SHORTLIST"
                        ? "Shortlisted"
                        : decision === "REJECT"
                        ? "Rejected"
                        : "Processing"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;