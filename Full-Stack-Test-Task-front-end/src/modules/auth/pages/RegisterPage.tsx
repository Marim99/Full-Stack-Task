import Logo from "@/components/shared/logo";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full h-0.50  max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-center mb-4">
          <Logo/>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>
        <RegisterForm />

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
