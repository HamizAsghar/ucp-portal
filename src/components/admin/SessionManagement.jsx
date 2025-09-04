"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Square, Download, Clock, FileText, AlertCircle, CheckCircle, Trash2 } from "lucide-react";

export default function SessionManagement({ onSessionChange }) {
  const [sessionStatus, setSessionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    sessionType: "",
    year: new Date().getFullYear(),
  });
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [deletingSession, setDeletingSession] = useState(null);
  const [graduates, setGraduates] = useState([]);
  const [graduationYears, setGraduationYears] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({ year: "", program: "", search: "" });

  // Memoized fetch functions to prevent re-renders
  const checkSessionStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/session/status");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSessionStatus(data);
      if (onSessionChange) {
        onSessionChange(data.hasActiveSession);
      }
    } catch (error) {
      console.error("Error checking session status:", error);
      alert(`Error checking session status: ${error.message}`);
    }
  }, [onSessionChange]);

  const fetchSessionHistory = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/session/history");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSessionHistory(data.sessions || []);
    } catch (error) {
      console.error("Error fetching session history:", error);
      alert(`Error fetching session history: ${error.message}`);
    }
  }, []);

  const fetchGraduates = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.year) params.append("year", filters.year);
      if (filters.program) params.append("program", filters.program);
      if (filters.search) params.append("search", filters.search);

      const response = await fetch(`/api/admin/graduates?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGraduates(data.graduates || []);
      setGraduationYears(data.graduationYears || []);
      setPrograms(data.programs || []);
    } catch (error) {
      console.error("Error fetching graduates:", error);
      alert(`Error fetching graduates: ${error.message}`);
    }
  }, [filters]);

  // Initial data fetch with loading state
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([checkSessionStatus(), fetchSessionHistory(), fetchGraduates()]);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [checkSessionStatus, fetchSessionHistory, fetchGraduates]);

  // Refetch graduates when filters change
  useEffect(() => {
    const loadGraduates = async () => {
      setLoading(true);
      try {
        await fetchGraduates();
      } finally {
        setLoading(false);
      }
    };
    loadGraduates();
  }, [filters, fetchGraduates]);

  const startSession = async () => {
    if (!sessionForm.sessionType || !sessionForm.year) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionForm),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Session started successfully!");
        await Promise.all([checkSessionStatus(), fetchSessionHistory()]);
        setSessionForm({ sessionType: "", year: new Date().getFullYear() });
      } else {
        alert(data.message || "Error starting session");
      }
    } catch (error) {
      console.error("Error starting session:", error);
      alert(`Error starting session: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const endSession = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/session/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        if (data.excelReport) {
          downloadFileFromBase64(data.excelReport, {
            sessionType: data.sessionData.sessionType,
            year: data.sessionData.year,
            type: "xlsx",
          });
        }
        alert("Session ended successfully! Excel report has been downloaded.");
        await Promise.all([checkSessionStatus(), fetchSessionHistory(), fetchGraduates()]);
        setShowEndConfirm(false);
      } else {
        alert(data.message || "Error ending session");
      }
    } catch (error) {
      console.error("Error ending session:", error);
      alert(`Error ending session: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadFileFromBase64 = (base64Data, { sessionType, year, type = "xlsx" }) => {
    try {
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const mimeType = type === "xlsx" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "application/pdf";
      const extension = type === "xlsx" ? "xlsx" : "pdf";
      const blob = new Blob([bytes], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Report_${sessionType}_${year}_${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`${extension.toUpperCase()} file downloaded successfully`);
    } catch (error) {
      console.error(`Error downloading ${extension.toUpperCase()} file:`, error);
      alert(`Error downloading ${extension.toUpperCase()} file: ${error.message}`);
    }
  };

  const generateGraduatesExcel = async () => {
    if (graduates.length === 0) {
      alert("No graduates available to generate Excel");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/graduates/excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graduates }),
      });

      const data = await response.json();
      if (response.ok && data.excelReport) {
        downloadFileFromBase64(data.excelReport, {
          sessionType: "Graduates",
          year: new Date().getFullYear(),
          type: "xlsx",
        });
        alert("Graduates Excel report downloaded successfully!");
      } else {
        alert(data.message || "Error generating Excel report");
      }
    } catch (error) {
      console.error("Error generating graduates Excel:", error);
      alert(`Error generating Excel file: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateSessionExcel = async (session) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/session/excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session }),
      });

      const data = await response.json();
      if (response.ok && data.excelReport) {
        downloadFileFromBase64(data.excelReport, {
          sessionType: session.sessionType,
          year: session.year,
          type: "xlsx",
        });
        alert("Session Excel report downloaded successfully!");
      } else {
        alert(data.message || "Error generating Excel report");
      }
    } catch (error) {
      console.error("Error generating session Excel:", error);
      alert(`Error generating Excel file: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId) => {
    if (!confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setDeletingSession(sessionId);
    try {
      const response = await fetch("/api/admin/session/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Session deleted successfully!");
        await fetchSessionHistory();
      } else {
        alert(data.message || "Error deleting session");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      alert(`Error deleting session: ${error.message}`);
    } finally {
      setDeletingSession(null);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Session Management</h1>
        <div className="flex items-center space-x-2">
          {sessionStatus?.hasActiveSession ? (
            <div className="flex items-center text-green-400">
              <CheckCircle className="mr-2" size={20} />
              Active Session
            </div>
          ) : (
            <div className="flex items-center text-red-400">
              <AlertCircle className="mr-2" size={20} />
              No Active Session
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Clock className="mr-2" size={24} />
          Current Session
        </h2>

        {sessionStatus?.hasActiveSession ? (
          <div className="space-y-4">
            <div className="bg-green Pujab 600/20 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-medium mb-2">Active Session</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2">{sessionStatus.session?.sessionType || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white ml-2">{sessionStatus.session?.year || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400">Started:</span>
                  <span className="text-white ml-2">
                    {sessionStatus.session?.startDate
                      ? new Date(sessionStatus.session.startDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowEndConfirm(true)}
              disabled={loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
            >
              <Square className="mr-2" size={20} />
              {loading ? "Ending Session..." : "End Session"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Type</label>
                <select
                  value={sessionForm.sessionType}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  <option value="">Select Session Type</option>
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <input
                  type="number"
                  value={sessionForm.year}
                  onChange={(e) => setSessionForm({ ...sessionForm, year: parseInt(e.target.value) || "" })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="2020"
                  max="2030"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={startSession}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
            >
              <Play className="mr-2" size={20} />
              {loading ? "Starting Session..." : "Start Session"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="mr-2" size={24} />
          Graduates ({graduates.length})
        </h2>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Year</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">All Years</option>
              {graduationYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Program</label>
            <select
              value={filters.program}
              onChange={(e) => setFilters({ ...filters, program: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">All Programs</option>
              {programs.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by name or registration number"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        <button
          onClick={generateGraduatesExcel}
          disabled={graduates.length === 0 || loading}
          className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
        >
          <Download className="mr-2" size={16} />
          {loading ? "Generating..." : "Download Graduates Excel"}
        </button>

        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading graduates...</p>
        ) : graduates.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No graduates found</p>
        ) : (
          <div className="space-y-4">
            {graduates.map((graduate) => (
              <div key={graduate._id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-gray-400 text-sm">Name:</span>
                    <div className="text-white">{graduate.name || "N/A"}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Registration Number:</span>
                    <div className="text-white">{graduate.registrationNumber || "N/A"}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Program:</span>
                    <div className="text-white">{graduate.program || "N/A"}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Graduation Year:</span>
                    <div className="text-white">{graduate.graduationYear || "N/A"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="mr-2" size={24} />
          Session History ({sessionHistory.length})
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading session history...</p>
        ) : sessionHistory.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No previous sessions found</p>
        ) : (
          <div className="space-y-4">
            {sessionHistory.map((session) => (
              <div key={session._id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-center">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                    <div>
                      <span className="text-gray-400 text-sm">Session:</span>
                      <div className="text-white font-medium">
                        {session.sessionType} {session.year}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Started:</span>
                      <div className="text-white">
                        {session.startDate ? new Date(session.startDate).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Ended:</span>
                      <div className="text-white">
                        {session.endDate ? new Date(session.endDate).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Duration:</span>
                      <div className="text-white">
                        {session.endDate && session.startDate
                          ? `${Math.ceil(
                              (new Date(session.endDate) - new Date(session.startDate)) / (1000 * 60 * 60 * 24)
                            )} days`
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => generateSessionExcel(session)}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                    >
                      <Download className="mr-2" size={16} />
                      {loading ? "Generating..." : "Download Excel"}
                    </button>
                    <button
                      onClick={() => deleteSession(session._id)}
                      disabled={loading || deletingSession === session._id}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                    >
                      <Trash2 className="mr-2" size={16} />
                      {deletingSession === session._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEndConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">End Session Confirmation</h3>
            <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-400 text-sm">⚠️ Warning: Ending this session will:</p>
              <ul className="text-red-400 text-sm mt-2 ml-4 list-disc">
                <li>Clear all teacher class assignments</li>
                <li>Clear all student enrollments</li>
                <li>Increment all students to next semester</li>
                <li>Clear all class subjects</li>
                <li>Reset all class sections</li>
                <li>Generate and download a comprehensive Excel report</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={endSession}
                disabled={loading}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {loading ? "Ending..." : "Yes, End Session"}
              </button>
              <button
                onClick={() => setShowEndConfirm(false)}
                disabled={loading}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}