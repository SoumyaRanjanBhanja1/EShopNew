import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We’re not just building an e‑commerce platform — we’re crafting a
            **world‑class shopping experience** that blends cutting‑edge
            technology, seamless design, and customer obsession.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">🚀 Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To empower millions of shoppers and sellers by delivering a
              **secure, fast, and delightful digital marketplace**. We aim to
              make every interaction — from browsing to checkout — effortless
              and memorable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">🌍 Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To become a **global leader in e‑commerce**, setting benchmarks in
              **innovation, trust, and customer delight**. We envision a future
              where shopping is not just a transaction, but an experience.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">💡 Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Customer Obsession",
                desc: "Every decision starts with the customer and works backwards.",
              },
              {
                title: "Innovation First",
                desc: "We embrace creativity, technology, and bold ideas to stay ahead.",
              },
              {
                title: "Trust & Transparency",
                desc: "We build long‑term relationships through honesty and reliability.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold">👩‍💻 Meet Our Team</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            A passionate group of developers, designers, and dreamers who
            believe in building products that **inspire trust and spark joy**.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {["Soumya", "Riya", "Arjun"].map((name, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition"
              >
                <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                  {name[0]}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{name}</h3>
                <p className="text-gray-400 text-sm">Full‑Stack Developer</p>
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
          <h2 className="text-3xl font-bold mb-4">Join Our Journey 🚀</h2>
          <p className="text-gray-200 mb-6">
            We’re just getting started. Be part of a revolution that’s shaping
            the future of e‑commerce.
          </p>
          <a
            href="/careers"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Explore Careers
          </a>
        </motion.div>
      </div>
    </div>
  );
}