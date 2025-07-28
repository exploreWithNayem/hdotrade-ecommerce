import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
        {/* Logo Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-red-500">
            N<span className="text-gray-800">KART</span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-primary rounded-full animate-bounce mx-auto"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white border-4 border-gray-200 rounded-full"></div>
          </div>

          <h1 className="text-3xl font-bold text-primary mb-4">
            Under Construction
          </h1>
          <p className="text-gray-600 mb-6">
            Our website is getting a makeover on some parts! We will be live soon with
            exciting features and products.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-gray-500">
          <p>Follow us for updates:</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link
              href="#"
              className="text-red-500 hover:text-red-600 transition"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </Link>
            <Link
              href="#"
              className="text-red-500 hover:text-red-600 transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </Link>
            <Link
              href="#"
              className="text-red-500 hover:text-red-600 transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
