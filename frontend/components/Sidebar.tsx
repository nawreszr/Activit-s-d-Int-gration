'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Building2, 
  LayoutDashboard, 
  GraduationCap, 
  ChevronRight,
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Étudiants', href: '/etudiants', icon: Users },
    { name: 'Départements', href: '/departements', icon: Building2 },
  ];

  const secondaryItems = [
    { name: 'Settings', href: '#', icon: Settings },
    { name: 'Help', href: '#', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-[100] p-2 glass rounded-xl text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-72 glass-dark border-r border-white/5 z-[90] transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          {/* Logo Area */}
          <div className="mb-12">
            <Link href="/" className="flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                  EduManager
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">Nexus v4.0</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 ml-4">Main Menu</div>
            {navItems.map((item: any) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5" 
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon size={20} className={cn("mr-3 transition-colors", isActive ? "text-primary" : "group-hover:text-white")} />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight size={16} className="animate-pulse" />}
                </Link>
              );
            })}

            <div className="pt-8 text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 ml-4">Preferences</div>
            {secondaryItems.map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-4 py-3.5 rounded-2xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <item.icon size={20} className="mr-3 group-hover:text-white" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile / Logout */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <button className="w-full group flex items-center px-4 py-3.5 rounded-2xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300">
              <LogOut size={20} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
