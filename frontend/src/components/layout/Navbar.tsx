import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-6 bg-white shadow-sm">

      <h1 className="text-3xl font-extrabold tracking-tight">
         Campus<span className="text-blue-600">Connect</span>
        </h1>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Register
        </Link>
      </div>

    </nav>
  );
}