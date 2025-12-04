export default function Footer() {
  return (
    <footer className="bg-spectrum-navy text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white text-sm">
              © {new Date().getFullYear()} Spectrum Groupe
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <a
              href="#"
              className="text-white hover:text-spectrum-yellow transition-colors"
            >
              Legal Notice
            </a>
            <span className="hidden md:inline text-spectrum-neutral-600">|</span>
            <a
              href="#"
              className="text-white hover:text-spectrum-yellow transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
