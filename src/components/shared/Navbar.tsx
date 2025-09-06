'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, useI18n } from '@/contexts';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';

interface NavItem {
  id: string;
  label_en: string;
  label_ar: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: 'find-jobs',
    label_en: 'Find Jobs',
    label_ar: 'البحث عن وظائف',
    href: '/jobs',
  },
  {
    id: 'browse-companies',
    label_en: 'Browse Companies',
    label_ar: 'تصفح الشركات',
    href: '/companies',
  },
  {
    id: 'about',
    label_en: 'About',
    label_ar: 'من نحن',
    href: '/about',
  },
  {
    id: 'contact',
    label_en: 'Contact',
    label_ar: 'اتصل بنا',
    href: '/contact',
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { language, toggleLanguage, direction } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              ص
            </div>
            <div className="font-bold">
              <span className="text-gray-900">SU'UD</span>
              <span className="text-gray-500 text-sm mx-1">|</span>
              <span className="text-gray-600 text-sm">صعود</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive(item.href)
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {language === 'en' ? item.label_en : item.label_ar}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2"
            >
              <span className="text-lg">
                {language === 'en' ? '🇸🇦' : '🇺🇸'}
              </span>
              {language === 'en' ? 'العربية' : 'English'}
            </Button>

            {/* Auth Buttons or User Menu */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                  </Button>
                </Link>
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    {language === 'en' ? 'Login' : 'تسجيل دخول'}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    {language === 'en' ? 'Sign Up' : 'إنشاء حساب'}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-5 h-5 flex flex-col justify-center">
                <span
                  className={cn(
                    'block h-0.5 w-full bg-gray-600 transition-all duration-200',
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : 'mb-1'
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-full bg-gray-600 transition-opacity duration-200',
                    isMobileMenuOpen ? 'opacity-0' : 'mb-1'
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-full bg-gray-600 transition-all duration-200',
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                  )}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md"
            >
              <div className="py-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'block px-4 py-2 text-sm font-medium transition-colors duration-200',
                      isActive(item.href)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === 'en' ? item.label_en : item.label_ar}
                  </Link>
                ))}

                <div className="border-t border-gray-100 pt-3 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="w-full justify-start"
                  >
                    {language === 'en' ? 'العربية' : 'English'}
                  </Button>
                </div>

                {!isAuthenticated && (
                  <div className="border-t border-gray-100 pt-3 px-4 space-y-2">
                    <Link href="/auth/login" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'en' ? 'Login' : 'تسجيل دخول'}
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="block">
                      <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        {language === 'en' ? 'Sign Up' : 'إنشاء حساب'}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
