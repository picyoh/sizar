import Link from "next/link";
import Image from "next/image";

interface imageType {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

export default function Links({
  href,
  content,
  image,
}: {
  href: string;
  content?: string | undefined;
  image?: imageType | undefined;
}) {
  return (
    <>
      <Link href={href}>
        {image ? (
          <Image
            aria-hidden
            src={image.src!}
            alt={image.alt!}
            width={image.width}
            height={image.height}
            className={image.className}
          />
        ) : (
          content
        )}
      </Link>
    </>
  );
}
