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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-6 shadow-md rounded-xl text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800">
              {t('home.welcome')}, {user.name}
            </h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
          </>
        ) : (
          <p className="text-gray-500">{t('home.loadingUser')}</p>
        )}
      </div>
    </div>
  );
}
