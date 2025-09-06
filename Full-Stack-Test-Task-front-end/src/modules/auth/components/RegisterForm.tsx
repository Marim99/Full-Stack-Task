import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    if (name.trim().length < 3) {
      newErrors.push(t("register.nameTooShort"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.push(t("register.invalidEmail"));
    }
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.push(t("register.invalidPassword"));
    }
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors([]);
    try {
      await registerUser(email, name, password);
      navigate("/login");
    } catch (err: any) {
      const messages = err.response?.data?.message || ["Something went wrong"];
      setErrors(Array.isArray(messages) ? messages : [messages]);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        {errors.length > 0 && (
          <div className="mb-6 rounded-lg border-l-4 border-red-600 bg-red-50 p-4">
            <div className="flex items-start">
              <ul className="space-y-1 text-sm text-red-700" data-test='error-list'>
                {errors.map((err, idx) => (
                  <li key={idx}>* {err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              {t("register.name")}
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 shadow-sm px-4 py-2 text-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              data-test='name-input'
            />
          </div>
          
              <div className="mb-5">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("register.email")}</label>
              <input type="email" id="email" data-test='email-input' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" onChange={(e) => setEmail(e.target.value)}  value={email}  required />
            </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700">
              {t("register.password")}
            </label>
            <input
              type="password"
              className="mt-2 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 shadow-sm px-4 py-2 text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              data-test='password-input'
            />
          </div>

          <button
            type="submit"
            data-test='register-button'
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 active:bg-indigo-800 shadow-md transition-all"
          >
            {t("register.register")}
          </button>
        </form>
      </div>
    </div>
  );
}
