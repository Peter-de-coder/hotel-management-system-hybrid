import React, { useEffect, useState } from "react";
import TopNav from "../_component/TopNav";
import { FeedbackService } from "../../services/feedbackService";
import { LuSearch, LuTrash2, LuCheck, LuEye, LuMessageSquare, LuInbox, LuBadgeCheck, LuLoaderCircle } from "react-icons/lu";

const initialFeedbacks = [];

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await FeedbackService.getFeedbacks();
      if (res.success && res.data) {
        const dbData = res.data;
        const merged = [...dbData, ...initialFeedbacks.filter(mock => !dbData.some(db => db.email === mock.email && db.subject === mock.subject))];
        setFeedbacks(merged);
      } else {
        setFeedbacks(initialFeedbacks);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setFeedbacks(initialFeedbacks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      if (id.toString().startsWith("fb-")) {
        setFeedbacks(feedbacks.filter((fb) => (fb._id || fb.id) !== id));
      } else {
        setLoading(true);
        await FeedbackService.deleteFeedback(id);
        alert("Feedback deleted successfully!");
        fetchFeedbacks();
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback");
      setLoading(false);
    }
  };

  const handleResolve = async (id, newStatus = "Resolved") => {
    try {
      if (id.toString().startsWith("fb-")) {
        setFeedbacks(
          feedbacks.map((fb) => ((fb._id || fb.id) === id ? { ...fb, status: newStatus } : fb))
        );
      } else {
        setLoading(true);
        await FeedbackService.updateFeedback(id, { status: newStatus });
        fetchFeedbacks();
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert("Failed to update feedback status");
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const name = fb.name || "";
    const email = fb.email || "";
    const subject = fb.subject || "";
    const message = fb.message || "";

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      subject.toLowerCase().includes(search.toLowerCase()) ||
      message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || fb.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || fb.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate statistics
  const total = feedbacks.length;
  const pending = feedbacks.filter((fb) => fb.status === "Pending").length;
  const resolved = feedbacks.filter((fb) => fb.status === "Resolved" || fb.status === "Reviewed").length;

  return (
    <section className="min-h-screen bg-gray-50">
      <TopNav />
      <section className="px-7 my-7">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-semibold uppercase text-main text-lg tracking-wider">Feedbacks & Reviews</h2>
            <p className="text-sm text-gray-500 mt-1">Monitor and respond to guest suggestions, inquiries, and complaints</p>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="bg-main/10 p-4 rounded-xl text-main">
              <LuInbox size={24} />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">Total Inbox</span>
              <span className="text-2xl font-bold text-gray-900 mt-0.5">{total}</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600">
              <LuMessageSquare size={24} />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">Pending Action</span>
              <span className="text-2xl font-bold text-gray-900 mt-0.5">{pending}</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="bg-green-50 p-4 rounded-xl text-green-600">
              <LuBadgeCheck size={24} />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">Resolved</span>
              <span className="text-2xl font-bold text-gray-900 mt-0.5">{resolved}</span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <LuSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search feedback content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-gray-50/50 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="General">General</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Complaint">Complaint</option>
              <option value="Support">Support</option>
            </select>

            {/* Status Filter buttons */}
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                statusFilter === "all" ? "bg-main text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter("Pending")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                statusFilter === "Pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("Resolved")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                statusFilter === "Resolved" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Resolved
            </button>
            <button
              onClick={() => setStatusFilter("Reviewed")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                statusFilter === "Reviewed" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Reviewed
            </button>
          </div>
        </div>

        {/* Feedback List Table */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LuLoaderCircle className="animate-spin text-main text-4xl" />
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No feedback entries found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                    <th className="px-6 py-4">Sender Details</th>
                    <th className="px-6 py-4">Subject & Category</th>
                    <th className="px-6 py-4">Message Preview</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Received Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {filteredFeedbacks.map((fb) => {
                    const id = fb._id || fb.id;
                    const dateStr = fb.createdAt ? new Date(fb.createdAt).toLocaleDateString() : fb.date;

                    return (
                      <tr key={id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{fb.name}</div>
                          <div className="text-xs text-gray-400">{fb.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{fb.subject || "No Subject"}</div>
                          <span className={`inline-block px-2 py-0.5 text-2xs font-bold rounded-md uppercase mt-1 ${
                            fb.category === "Complaint" 
                              ? "bg-red-50 text-red-700 border border-red-100" 
                              : fb.category === "Suggestion" 
                              ? "bg-purple-50 text-purple-700 border border-purple-100" 
                              : fb.category === "Support" 
                              ? "bg-blue-50 text-blue-700 border border-blue-100" 
                              : "bg-gray-50 text-gray-700 border border-gray-100"
                          }`}>
                            {fb.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate">
                          {fb.message}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            fb.status === "Resolved"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : fb.status === "Reviewed"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}>
                            {fb.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {dateStr}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedFeedback(fb)}
                              className="text-main hover:bg-main/5 p-2 rounded-xl transition cursor-pointer"
                              title="View Message"
                            >
                              <LuEye size={18} />
                            </button>
                            {fb.status === "Pending" && (
                              <button
                                onClick={() => handleResolve(id, "Reviewed")}
                                className="text-blue-600 hover:bg-blue-50 p-2 rounded-xl transition cursor-pointer"
                                title="Mark Reviewed"
                              >
                                <LuCheck size={18} />
                              </button>
                            )}
                            {(fb.status === "Pending" || fb.status === "Reviewed") && (
                              <button
                                onClick={() => handleResolve(id, "Resolved")}
                                className="text-green-600 hover:bg-green-50 p-2 rounded-xl transition cursor-pointer"
                                title="Mark Resolved"
                              >
                                <LuCheck size={18} className="font-bold" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(id)}
                              className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition cursor-pointer"
                              title="Delete Feedback"
                            >
                              <LuTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Message Modal overlay */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 animate-scale-in">
            <div className="bg-main text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-white/70 uppercase tracking-widest font-semibold block">{selectedFeedback.category} Feedback</span>
                  <h3 className="text-xl font-bold font-poppins mt-1">{selectedFeedback.subject || "No Subject"}</h3>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-white/80 hover:text-white text-2xl font-bold cursor-pointer"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Sender info */}
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">From</p>
                  <p className="font-bold text-gray-900 text-sm mt-0.5">{selectedFeedback.name}</p>
                  <p className="text-xs text-gray-500">{selectedFeedback.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-semibold uppercase">Date</p>
                  <p className="text-xs font-bold text-gray-700 mt-0.5">
                    {selectedFeedback.createdAt ? new Date(selectedFeedback.createdAt).toLocaleDateString() : selectedFeedback.date}
                  </p>
                </div>
              </div>

              {/* Message content */}
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase mb-1.5">Message Details</p>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-gray-700 text-sm leading-relaxed max-h-60 overflow-y-auto italic">
                  "{selectedFeedback.message}"
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-2 border-t border-gray-100">
              {selectedFeedback.status !== "Resolved" && (
                <button
                  onClick={() => {
                    handleResolve(selectedFeedback._id || selectedFeedback.id, "Resolved");
                    setSelectedFeedback(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition cursor-pointer"
                >
                  Mark Resolved
                </button>
              )}
              <button
                onClick={() => setSelectedFeedback(null)}
                className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllFeedbacks;
