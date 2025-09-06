import Logo from "@/components/shared/logo";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full h-0.50  max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-center mb-4">
          <Logo/>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("register.createAccount")}
        </h1>
        <RegisterForm />

        <p className="text-center text-sm text-gray-600 mt-6">
          {t("register.haveAccount")}{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            {t("signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
