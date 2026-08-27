import { Link } from "react-router-dom";

// ============================================================
// NOT FOUND PAGE
// ============================================================

// Displays a message when the requested route does not exist.
const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <section className="max-w-xl text-center">
        <h1 className="text-8xl font-bold leading-none text-sky-500">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg text-slate-600">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-600"
        >
          Go to Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
