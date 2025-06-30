
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudentData = async () => {
    try {
      console.log("Fetching student data from /api/student/me");
      const response = await fetch("/api/student/me", {
        method: "GET",
        credentials: "include",
      });
      console.log("Response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched student data:", data);
        setStudentData(data);
      } else {
        console.error("Failed to fetch student data:", await response.text());
        setStudentData(null);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <StudentContext.Provider value={{ studentData, loading, setStudentData, fetchStudentData }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  return useContext(StudentContext);
}