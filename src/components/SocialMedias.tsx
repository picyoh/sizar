import Image from "next/image";
export default function SocialMedias({
  href,
  src,
  alt,
  icon,
}: {
  href: string;
  src: string | undefined;
  alt: string | undefined;
  icon: React.JSX.Element | undefined;
}) {
  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon ? (
          icon
        ) : (
          <Image aria-hidden src={src!} alt={alt!} width={16} height={16} />
        )}
      </a>
    </>
  );
}
