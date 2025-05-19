import Image from "next/image";
import { SiLinkedin, SiBuymeacoffee, SiReddit } from "react-icons/si";
import SocialMedias from "./SocialMedias";
import Links from "./Links";

export default function Footer() {
  // TODO: change links
  const socialMedias = [
    { id:"buymeacofee", href: "https://www.buymeacoffee.com/manures", icon: <SiBuymeacoffee /> },
    { id:"linkedin", href: "https://www.buymeacoffee.com/manures", icon: <SiLinkedin /> },
    { id:"reddit", href: "https://www.buymeacoffee.com/manures", icon: <SiReddit /> },
    { id:"quaeres", href: "https://www.buymeacoffee.com/manures", src:"/img/globe.svg", alt:"Manures icon"},
  ];

  const links = [
    {id:"privacy", href:"/terms/privacy", content:"Confidentialite"},
    {id:"legal", href:"/terms/legal", content:"Mentions Legales"},
    {id:"cgu", href:"/terms/cgu", content:"C.G.U"},
    {id:"cgv", href:"/terms/cgv", content:"C.G.V"},
  ]

  return (
    <footer className="bottom-0 flex flex-col justify-evenly bg-gray-900">
      <div className="flex justify-between items-center p-4">
        <div className="">
          <Image
            aria-hidden
            src="/img/toise.svg"
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
        {socialMedias.map((element) => {
          return(
            <SocialMedias 
              key={element.id} 
              href={element.href} 
              src={element.src}
              alt={element.alt}
              icon={element.icon}
            />
          );
        })}
      </div>
      <p className="text-center text-xs">2025 Quaeres</p>
      <div id="internal_links" className="flex justify-evenly text-xs">
        {links.map((element)=>{
          return (
            <Links 
              key={element.id}
              href={element.href}
              content={element.content}
            />
          )
        })}
      </div>
    </footer>
  );
}
