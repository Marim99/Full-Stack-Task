import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { user, curentUser } = useAuth();
  const { t } = useTranslation();
  useEffect(() => {
    curentUser();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#f0754d] from-50% to-white to-50%">
      <div className="bg-white p-10 shadow-2xl rounded-2xl text-center max-w-lg w-full transform transition-all hover:scale-105 hover:shadow-3xl">
        {user ? (
          <>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f0754d] to-orange-400">
              {t('home.welcome')}, {user.name} 👋
            </h1>
            <p className="text-lg text-gray-600 mt-4">{user.email}</p>

            <div className="mt-6 flex justify-center">
              <span className="px-5 py-2 rounded-full text-sm font-medium bg-[#f0754d]/10 text-[#f0754d]">
                Active User
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-lg animate-pulse">
            {t('home.loadingUser')}
          </p>
        )}
      </div>
    </div>
  );
}
