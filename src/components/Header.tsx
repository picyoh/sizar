import Link from "next/link";
import Image from "next/image";
import Links from "./Links";

export default function Header() {
  const links = [
    { id: "tryapp", href: "/tryapp", content: "Essayer" },
    { id: "signup", href: "/signup", content: "Creer un compte" },
    { id: "login", href: "/login", content: "Se connecter" },
  ];
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
      <nav>
        {links.map((element) => {
          return (
            <Links
              key={element.id}
              href={element.href}
              content={element.content}
            />
          );
        })}
      </nav>
    </header>
  );
}
