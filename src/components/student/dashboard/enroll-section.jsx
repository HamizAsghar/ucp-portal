import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Plus, AlertCircle, CheckCircle, User, Lock, BookOpen } from "lucide-react";

export default function EnrollSection({ onEnrollSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Enroll form data:", formData); // Log form data for debugging

    if (!formData.username || !formData.password) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in both username and password",
        icon: "warning",
        confirmButtonColor: "#3b82f6",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/student/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Enrolled Successfully!",
          text: data.message,
          icon: "success",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          setFormData({ username: "", password: "" });
          onEnrollSuccess(); // Trigger callback to refresh classes
          window.location.reload(); // Reload page to reflect changes
        });
      } else {
        Swal.fire({
          title: "Enrollment Failed",
          text: data.message || "Invalid class credentials",
          icon: "error",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      Swal.fire({
        title: "Enrollment Failed",
        text: error.message || "An error occurred while enrolling. Please try again.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 sm:px-6"
    >
      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Enroll in New Class</h1>
        <p className="text-blue-200">Enter the class credentials provided by your instructor to join a course.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-400" />
            Class Enrollment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Class Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter class username"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Class Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter class password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={loading}
            >
              <BookOpen className="h-5 w-5" />
              {loading ? "Enrolling..." : "Enroll in Class"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              How to Enroll
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <p>Get your class credentials from your instructor</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <p>Enter the username and password in the form</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <p>Click "Enroll in Class" to join the course</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  4
                </div>
                <p>Access your new class from the sidebar</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              Important Tips
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <p>Ensure credentials match your program, semester, and section</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <p>Username and password are case-sensitive</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <p>Contact your instructor if you encounter issues</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <p>You can enroll in multiple subjects within your section</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
            <p className="text-gray-300 mb-4">
              If you're having trouble enrolling, contact the IT support team or your instructor.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📧 Email: support@university.edu</p>
              <p>📞 Phone: (555) 123-4567</p>
              <p>🕒 Hours: Mon-Fri 8AM-6PM</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}