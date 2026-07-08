import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row lg:px-12">

        {/* Left Content */}
        <div className="max-w-2xl">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🚀 Built exclusively for College Students
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
            Connect with
            <br />

            <span className="text-blue-600">
              Your Campus
            </span>

            <br />
            Community
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-600 lg:text-xl">
            Meet classmates, discover clubs, share notes, participate in campus
            events, collaborate on projects, and build meaningful connections—
            all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Login
            </Link>

          </div>

          {/* Feature Pills */}
          <div className="mt-10 flex flex-wrap gap-4">

            <span className="rounded-full bg-blue-100 px-5 py-2 text-blue-700">
              🎓 Clubs
            </span>

            <span className="rounded-full bg-blue-100 px-5 py-2 text-blue-700">
              📚 Notes
            </span>

            <span className="rounded-full bg-blue-100 px-5 py-2 text-blue-700">
              💬 Chat
            </span>

            <span className="rounded-full bg-blue-100 px-5 py-2 text-blue-700">
              📅 Events
            </span>

          </div>

        </div>

        {/* Right Side Mockup */}
        <div className="flex items-center justify-center">

          <div className="relative h-[600px] w-[300px] rounded-[40px] border-8 border-slate-900 bg-white shadow-2xl">

            {/* Camera */}
            <div className="absolute left-1/2 top-3 h-2 w-20 -translate-x-1/2 rounded-full bg-slate-800"></div>

            {/* Screen */}
            <div className="p-6 pt-12">

              <div className="rounded-xl bg-blue-600 p-5 text-white shadow">

                <h2 className="text-xl font-bold">
                  Campus Feed
                </h2>

                <p className="mt-2 text-sm">
                  Discover everything happening on your campus.
                </p>

              </div>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl border p-4 shadow-sm">
                  📚 Notes uploaded
                </div>

                <div className="rounded-xl border p-4 shadow-sm">
                  🎉 Tech Fest this Friday
                </div>

                <div className="rounded-xl border p-4 shadow-sm">
                  💬 New Study Group
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}