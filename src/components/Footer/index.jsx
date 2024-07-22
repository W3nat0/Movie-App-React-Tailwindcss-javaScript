import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-yellow-500 font-bold mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-yellow-500">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-yellow-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/culture" className="hover:text-yellow-500">
                  Our Culture
                </Link>
              </li>
              <li>
                <Link to="/press-room" className="hover:text-yellow-500">
                  Press Room
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-yellow-500 font-bold mb-4">Plex Pass</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/go-premium" className="hover:text-yellow-500">
                  Go Premium
                </Link>
              </li>
              <li>
                <Link to="/get-perks" className="hover:text-yellow-500">
                  Get Perks
                </Link>
              </li>
              <li>
                <Link to="/tidal-plex" className="hover:text-yellow-500">
                  TIDAL x Plex
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-yellow-500 font-bold mb-4">Downloads</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/media-server" className="hover:text-yellow-500">
                  Plex Media Server
                </Link>
              </li>
              <li>
                <Link to="/apps-devices" className="hover:text-yellow-500">
                  Apps & Devices
                </Link>
              </li>
              <li>
                <Link to="/where-to-watch" className="hover:text-yellow-500">
                  Where to Watch
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-yellow-500 font-bold mb-4">Support</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/finding-help" className="hover:text-yellow-500">
                  Finding Help
                </Link>
              </li>
              <li>
                <Link to="/support-library" className="hover:text-yellow-500">
                  Support Library
                </Link>
              </li>
              <li>
                <Link to="/community-forums" className="hover:text-yellow-500">
                  Community Forums
                </Link>
              </li>
              <li>
                <Link to="/billing-questions" className="hover:text-yellow-500">
                  Billing Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p>&copy; 2024 Plex</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/privacy-legal" className="hover:text-yellow-500">
              Privacy & Legal
            </Link>
            <Link to="/ad-choices" className="hover:text-yellow-500">
              Ad Choices
            </Link>
            <Link to="/accessibility" className="hover:text-yellow-500">
              Accessibility
            </Link>
            <Link to="/manage-cookies" className="hover:text-yellow-500">
              Manage Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
