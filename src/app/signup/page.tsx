import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SiGoogle } from "react-icons/si";

export default function Login() {
  return (
    <div>
      <Header />
      <main className="h-[67vh] flex flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="w-[18rem] p-[.7rem] border-1 border-solid rounded-md bg-gray-700 flex justify-evenly"
        >
          <div className="flex items-center">
            <SiGoogle className="h-[1rem]" />
          </div>
          Se connecter avec Google
        </button>
        <hr className="w-1/2" />
        <Suspense>
          <form className="flex flex-col justify-center items-center gap-4">
            <label>Adresse mail:</label>
            <input
              type="email"
              placeholder="john.doe@anon.com"
              className="p-[.3rem] border-1 border-solid rounded-md bg-gray-700"
            />
            <label>Mot de passe:</label>
            <input
              type="password"
              placeholder="********"
              className="p-[.3rem] border-1 border-solid rounded-md bg-gray-700"
            />
            <label>Confirmation mot de passe:</label>
            <input
              type="password"
              placeholder="********"
              className="p-[.3rem] border-1 border-solid rounded-md bg-gray-700"
            />
            <button
              type="submit"
              className="p-[.7rem] border-1 border-solid rounded-md bg-gray-700"
            >
              S&#39;inscrire
            </button>
          </form>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
