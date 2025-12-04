import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Groupe', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Atlassian Expertise', href: '#' },
    { name: 'Our customers', href: '#' },
    { name: 'Contact us', href: '#' },
  ];

  return (
    <header className="bg-spectrum-navy border-b border-spectrum-neutral-400 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img
                src="/assets/image.webp"
                alt="Spectrum Groupe logo"
                className="h-8 w-auto"
              />
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-spectrum-yellow transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
            <button className="px-3 py-1 bg-spectrum-orange text-white rounded text-sm font-medium hover:bg-spectrum-deep-orange transition-colors">
              EN
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-spectrum-yellow"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-white hover:text-spectrum-yellow transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
