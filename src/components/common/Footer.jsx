// import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10 px-4 md:px-16 text-sm mt-12">
      <div className="max-w-5xl mx-auto">
        {/* <div className="flex space-x-6 mb-6">
          <Facebook className="cursor-pointer hover:text-white" />
          <Instagram className="cursor-pointer hover:text-white" />
          <Twitter className="cursor-pointer hover:text-white" />
          <Youtube className="cursor-pointer hover:text-white" />
        </div> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Subtitles</li>
            <li className="hover:underline cursor-pointer">Media Center</li>
            <li className="hover:underline cursor-pointer">Privacy</li>
            <li className="hover:underline cursor-pointer">Contact </li>
          </ul>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Sound Base</li>
            <li className="hover:underline cursor-pointer">Networks</li>
            <li className="hover:underline cursor-pointer">Lgeal Rules</li>
          </ul>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Support Center</li>
            <li className="hover:underline cursor-pointer">Job Opportunities</li>
            <li className="hover:underline cursor-pointer">Cookies</li>
          </ul>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Gift Cards</li>
            <li className="hover:underline cursor-pointer">Rules</li>
            <li className="hover:underline cursor-pointer">Info</li>
          </ul>
        </div>
        <button className="border border-gray-500 px-4 py-1 text-gray-400 hover:text-white hover:border-white mb-6">
          Service Code
        </button>
        <p className="text-xs">© 2024 Netflix, Inc.</p>
      </div>
    </footer>
  );
}
