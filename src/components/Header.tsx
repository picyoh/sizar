import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 w-full bg-gray-900 flex justify-between">
      <Link href="/">
        <Image
          aria-hidden
          src="/toise.svg"
          alt="Toise icon"
          width={128}
          height={128}
          className="mix-blend-multiply"
        />
      </Link>
      <nav className="flex justify-evenly items-center gap-8 px-8">
        <Link href="/">Essayez</Link>
        <Link href="/signup">Creer un compte</Link>
        <Link href="/login">Se connecter</Link>
      </nav>
    </header>
  );
}