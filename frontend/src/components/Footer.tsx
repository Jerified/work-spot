import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="w-full">
      <Container className="">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          {/* First Column */}
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link href="/" className="flex justify-center lg:justify-start">
              <span className="text-2xl font-bold text-[#E16B8C]">WorkSpot</span>
            </Link>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
              Find and book the perfect workspace for your needs. Discover coworking spaces, meeting rooms, and more.
            </p>
            <Link href="/contact" className="py-2.5 px-5 h-9 block w-fit bg-[#E16B8C] rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-pink-700 lg:mx-0">
              Contact us
            </Link>
          </div>

          {/* Second Column */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-400 font-medium mb-7">Navigation</h4>
            <ul className="text-sm">
              <li className="mb-6"><Link href="/" className="text-gray-600 hover:text-[#E16B8C]">Home</Link></li>
              <li className="mb-6"><Link href="/about" className="text-gray-600 hover:text-[#E16B8C]">About</Link></li>
              <li className="mb-6"><Link href="/spaces" className="text-gray-600 hover:text-[#E16B8C]">Explore Spaces</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-[#E16B8C]">Blog</Link></li>
            </ul>
          </div>

          {/* Third Column */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-400 font-medium mb-7">Spaces</h4>
            <ul className="text-sm">
              <li className="mb-6"><Link href="/spaces/coworking" className="text-gray-600 hover:text-[#E16B8C]">Coworking Spaces</Link></li>
              <li className="mb-6"><Link href="/spaces/meeting-rooms" className="text-gray-600 hover:text-[#E16B8C]">Meeting Rooms</Link></li>
              <li className="mb-6"><Link href="/spaces/private-offices" className="text-gray-600 hover:text-[#E16B8C]">Private Offices</Link></li>
              <li><Link href="/spaces/event-venues" className="text-gray-600 hover:text-[#E16B8C]">Event Venues</Link></li>
            </ul>
          </div>

          {/* Fourth Column */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-400 font-medium mb-7">Resources</h4>
            <ul className="text-sm">
              <li className="mb-6"><Link href="/faqs" className="text-gray-600 hover:text-[#E16B8C]">FAQs</Link></li>
              <li className="mb-6"><Link href="/help" className="text-gray-600 hover:text-[#E16B8C]">Help Center</Link></li>
              <li className="mb-6"><Link href="/terms" className="text-gray-600 hover:text-[#E16B8C]">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-[#E16B8C]">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Fifth Column */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-400 font-medium mb-7">For Owners</h4>
            <ul className="text-sm">
              <li className="mb-6"><Link href="/list-space" className="text-gray-600 hover:text-[#E16B8C]">List Your Space</Link></li>
              <li className="mb-6"><Link href="/owner-resources" className="text-gray-600 hover:text-[#E16B8C]">Resources</Link></li>
              <li className="mb-6"><Link href="/success-stories" className="text-gray-600 hover:text-[#E16B8C]">Success Stories</Link></li>
              <li><Link href="/owner-faq" className="text-gray-600 hover:text-[#E16B8C]">Owner FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500">
              © <Link href="/" className="hover:text-[#E16B8C]">WorkSpot</Link> {new Date().getFullYear()}, All rights reserved.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0">
              <Link href="https://twitter.com" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-[#E16B8C]">
                <Twitter className="w-5 h-5 text-white" />
              </Link>
              <Link href="https://instagram.com" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-[#E16B8C]">
                <Instagram className="w-5 h-5 text-white" />
              </Link>
              <Link href="https://linkedin.com" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-[#E16B8C]">
                <Linkedin className="w-5 h-5 text-white" />
              </Link>
              <Link href="https://youtube.com" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-[#E16B8C]">
                <Youtube className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
