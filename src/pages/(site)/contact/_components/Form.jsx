import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FeedbackService } from "@/pages/(main)/admin/services/feedbackService";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "General",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      await FeedbackService.createFeedback(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", category: "General" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error sending feedback:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 bg-main text-white p-10 rounded-3xl shadow-xl flex flex-col justify-between h-full min-h-[500px]">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary50 opacity-90">
              Contact Information
            </h3>
            <h2 className="text-3xl font-bold font-poppins mt-2 mb-6">
              Get in Touch
            </h2>
            <p className="text-white/80 leading-relaxed text-sm mb-10">
              Have questions or need assistance? Reach out to our front desk or management team directly. We are always ready to assist you.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-3 rounded-lg text-primary50">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Location</h4>
                  <p className="text-white/70 text-xs mt-1">
                    Hybrid Hotel & Suites, Elele Uzairue, Edo State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-3 rounded-lg text-primary50">
                  <FaPhoneAlt className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Phone</h4>
                  <p className="text-white/70 text-xs mt-1">
                    +234 803 123 4567 | +234 812 987 6543
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-3 rounded-lg text-primary50">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Email Address</h4>
                  <p className="text-white/70 text-xs mt-1">
                    info@hybridhotel.com | reservations@hybridhotel.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-3 rounded-lg text-primary50">
                  <FaClock className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Working Hours</h4>
                  <p className="text-white/70 text-xs mt-1">
                    Front Desk: 24 Hours / 7 Days a week
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/50 text-center">
            &copy; 2026 Hybrid Hotel & Suites. All rights reserved.
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
          <h3 className="text-black/80 text-2xl font-bold font-poppins mb-6">
            Send Us a Message
          </h3>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl text-center font-medium animate-fade-in">
              Thank you! Your message has been sent successfully. We will get back to you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-black/60 uppercase">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anita Baker"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-main focus:bg-white focus:outline-none rounded-xl h-14 px-4 text-sm text-black mt-2 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-black/60 uppercase">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. anita@gmail.com"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-main focus:bg-white focus:outline-none rounded-xl h-14 px-4 text-sm text-black mt-2 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-black/60 uppercase">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 focus:border-main focus:bg-white focus:outline-none rounded-xl h-14 px-4 text-sm text-black mt-2 transition-all cursor-pointer"
              >
                <option value="General">GENERAL</option>
                <option value="Suggestion">SUGGESTION</option>
                <option value="Complaint">COMPLAIN</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-black/60 uppercase">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How can we help you?"
                className="w-full bg-gray-50 border border-gray-200 focus:border-main focus:bg-white focus:outline-none rounded-xl h-14 px-4 text-sm text-black mt-2 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-black/60 uppercase">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message here..."
                className="w-full bg-gray-50 border border-gray-200 focus:border-main focus:bg-white focus:outline-none rounded-xl p-4 text-sm text-black mt-2 transition-all resize-none"
              ></textarea>
            </div>

             <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-main hover:bg-main/90 disabled:bg-gray-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
