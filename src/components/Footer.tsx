import Image from "next/image";
import Link from "next/link";
import {
  SiLinkedin,
  SiBuymeacoffee,
  SiReddit
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bottom-0 flex flex-col justify-evenly bg-gray-900">
      <div className="flex justify-between items-center p-4">
        <div className="">
          <Image
            aria-hidden
            src="/toise.svg"
            alt="Filler"
            width={72}
            height={72}
            className="mix-blend-multiply"
          />
        </div>
        <div className="flex justify-center">
          <form className="w-fit">
            <h3>Newsletter</h3>
            <input type="text" name="contact_email" placeholder="Votre email" />
            <button type="submit">➔</button>
          </form>
        </div>
      </div>
      <div id="social_medias" className="flex justify-evenly p-4">
        <a
          href="https://www.buymeacoffee.com/manures"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiBuymeacoffee />
        </a>
        <a
          href="https://www.linkedin.com/company/manures-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLinkedin />
        </a>
        <a
          href="https://www.reddit.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiReddit />
        </a>
        <a
          href="https://www.manures.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Manures icon"
            width={16}
            height={16}
          />
        </a>
      </div>
      <p className="text-center text-xs">2025 Quaeres</p>
      <div id="internal_links" className="flex justify-evenly text-xs">
        <Link href="/terms/privacy">Confidentialite</Link>
        <Link href="/terms/legal">Mentions Legales</Link>
        <Link href="/terms/cgu">C.G.U</Link>
        <Link href="/terms/cgv">C.G.V</Link>
      </div>
    </footer>
  );
}
