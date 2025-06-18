"use client";

import { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  Users,
  Shield,
  Zap,
  Github,
  Twitter,
  Instagram,
  Youtube,
  ChevronUp,
  Globe,
  Star,
  Swords,
  MessageCircle,
  Video
} from 'lucide-react';

export default function Footer() {
  const [scrollY, setScrollY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setGlowPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: MessageCircle, label: 'Discord', color: 'hover:text-indigo-400', bgColor: 'hover:bg-indigo-500/20' },
    { icon: Video, label: 'Twitch', color: 'hover:text-purple-400', bgColor: 'hover:bg-purple-500/20' },
    { icon: Youtube, label: 'YouTube', color: 'hover:text-red-400', bgColor: 'hover:bg-red-500/20' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400', bgColor: 'hover:bg-blue-500/20' },
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400', bgColor: 'hover:bg-pink-500/20' },
    { icon: Github, label: 'GitHub', color: 'hover:text-gray-300', bgColor: 'hover:bg-gray-500/20' },
  ];

  const footerSections = [
    {
      title: 'Tournaments',
      icon: Trophy,
      links: ['Live Events', 'Upcoming', 'Past Results', 'Rankings', 'Prize Pools']
    },
    {
      title: 'Games',
      icon: Gamepad2,
      links: ['Valorant', 'CS2', 'League of Legends', 'Dota 2', 'Apex Legends']
    },
    {
      title: 'Community',
      icon: Users,
      links: ['Teams', 'Players', 'Forums', 'Discord', 'Leaderboards']
    },
    {
      title: 'Support',
      icon: Shield,
      links: ['Help Center', 'Contact', 'Bug Reports', 'Feature Requests', 'Status']
    }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      </div>

      {/* Dynamic Glow Effect */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
        style={{
          left: glowPosition.x - 192,
          top: glowPosition.y - 192,
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Swords className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                    Fraggix
                  </h3>
                  <p className="text-gray-400 text-sm">Pro Esports Platform</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                The ultimate destination for competitive gaming. Join millions of players,
                compete in tournaments, and climb the ranks in your favorite games.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">2.5M+</div>
                  <div className="text-xs text-gray-400">Players</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">50K+</div>
                  <div className="text-xs text-gray-400">Matches</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-green-400">$5M+</div>
                  <div className="text-xs text-gray-400">Prizes</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    className={`p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300 ${social.color} ${social.bgColor} hover:scale-110 hover:shadow-lg group`}
                  >
                    <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <section.icon className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold text-lg">{section.title}</h4>
                    </div>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 block relative group"
                          >
                            <span className="absolute left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2 flex items-center">
                    <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                    Stay in the Game
                  </h3>
                  <p className="text-gray-300">Get the latest tournament news, updates, and exclusive content.</p>
                </div>
                <div className="flex w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 min-w-2 sm:min-w-64"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-r-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
                <p className="text-gray-400">
                  © 2025 GameArena. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Cookies</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 z-50 ${scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      </div>
    </footer>
  );
}