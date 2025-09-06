import AppRouter from '@/routes/AppRouter';
import { AuthProvider } from '@/context/AuthContext';
import './App.css';
import './i18n';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
