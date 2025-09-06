import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { user, curentUser } = useAuth();

  useEffect(() => {
    curentUser();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-6 shadow-md rounded-xl text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user.name} 🎉
            </h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
          </>
        ) : (
          <p className="text-gray-500">Loading user...</p>
        )}
      </div>
    </div>
  );
}
