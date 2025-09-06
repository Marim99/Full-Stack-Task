import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Logo from './shared/logo';
import { useTranslation } from 'react-i18next';
export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </nav>
  );
}
