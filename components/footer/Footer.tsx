import React from "react";

export default async function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-6">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:justify-around items-center gap-6">
        <div className="flex flex-col items-center">
          <p>Jane Doe</p>

          <p className="text-sm text-slate-300">
            &copy; 2025 Furkan Arslan. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-white font-semibold mb-3  w-fit border-b-2 border-slate-300">
            Education Levels
          </h4>
          <ul className="flex flex-col items-center">
            <li>Primary School</li>
            <li>Middle School</li>
            <li>High School</li>
            <li>University</li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-white font-semibold mb-3 w-fit border-b-2 border-slate-300">
            Quick Links
          </h4>

          <ul className="flex flex-col items-center">
            <li>All Courses</li>
            <li>About Us</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h4 className="text-white font-semibold mb-3  w-fit border-b-2 border-slate-300">
            Contact
          </h4>
          <ul className="space-y-2 text-sm flex flex-col items-center">
            <li>Email: info@janedoe.com</li>
            <li>Phone: +90 555 555 55 55</li>
            <li>Online & One-on-One Lessons</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
