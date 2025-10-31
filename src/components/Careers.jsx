import { motion } from "framer-motion";

export default function Careers() {
  const perks = [
    {
      title: "🌍 Global Impact",
      desc: "Work on products that reach millions of users worldwide.",
    },
    {
      title: "🚀 Growth & Learning",
      desc: "Access to mentorship, workshops, and cutting‑edge tech stacks.",
    },
    {
      title: "💰 Competitive Packages",
      desc: "Industry‑leading salaries, bonuses, and stock options.",
    },
    {
      title: "🏖️ Work‑Life Balance",
      desc: "Flexible hours, remote options, and generous PTO.",
    },
    {
      title: "🧠 Innovation Culture",
      desc: "Freedom to experiment, fail fast, and build bold ideas.",
    },
    {
      title: "🤝 Inclusive Team",
      desc: "A diverse, collaborative environment where every voice matters.",
    },
  ];

  const jobs = [
    {
      role: "Frontend Engineer (React/Next.js)",
      location: "Hyderabad, India",
      type: "Full‑Time",
    },
    {
      role: "Backend Engineer (Node.js/Express)",
      location: "Remote",
      type: "Full‑Time",
    },
    {
      role: "UI/UX Designer",
      location: "Bangalore, India",
      type: "Full‑Time",
    },
    {
      role: "Product Manager",
      location: "Remote",
      type: "Full‑Time",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Careers at E‑Shop
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Join a team that’s redefining the future of e‑commerce.  
            We’re building **world‑class products** and we want you on board.
          </p>
        </motion.div>

        {/* Perks & Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <h2 className="text-3xl font-bold text-center">✨ Why Work With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                <p className="text-gray-300">{perk.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Open Roles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <h2 className="text-3xl font-bold text-center">📌 Open Positions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold">{job.role}</h3>
                <p className="text-gray-400">{job.location}</p>
                <p className="text-sm text-indigo-300 mb-4">{job.type}</p>
                <a
                  href={`/apply?role=${encodeURIComponent(job.role)}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">🚀 Ready to Build the Future?</h2>
          <p className="text-gray-200 mb-6">
            Whether you’re a coder, designer, or strategist — there’s a place
            for you here. Let’s create something extraordinary together.
          </p>
          <a
            href="/apply"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            View All Jobs
          </a>
        </motion.div>
      </div>
    </div>
  );
}