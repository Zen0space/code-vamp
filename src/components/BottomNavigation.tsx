import { Home, BookOpen, User } from 'lucide-react';

const BottomNavigation = () => {
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      href: '#',
      active: true
    },
    {
      icon: BookOpen,
      label: 'Library',
      href: '#library',
      active: false
    },
    {
      icon: User,
      label: 'Profile',
      href: '#profile',
      active: false
    }
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 md:hidden z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/25">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'text-red-500 bg-red-500/15 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:scale-105'
                }`}
              >
                <IconComponent size={20} className="mb-0.5" />
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation; 