import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="px-32 no-scrollbar overflow-y-scroll snap-y snap-mandatory h-[90vh]">
      <div className="flex justify-evenly items-center gap-4 h-3/4 snap-center">
        <div className="flex-1 gap-4">
          <Image
            className="w-full p-4"
            src="/cuisine.jpg"
            alt="image demonstration"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className="flex-2">
          <h3>Mesure facile et rapide avec votre téléphone</h3>
          <p>
            Découvrez une nouvelle manière de mesurer facilement grâce à votre
            smartphone. Avec notre application, vous pouvez utiliser la caméra
            de votre téléphone pour prendre des mesures précises de différents
            objets, espaces et surfaces, sans avoir besoin de règles ou de
            rubans à mesurer.
          </p>
        </div>
      </div>
      <div className="flex justify-evenly items-center gap-4 h-3/4 snap-center">
        <div className="flex-1 gap-4 order-2">
          <Image
            className="w-full p-4"
            src="/chambre.jpg"
            alt="image demonstration"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className="flex-2">
          <h3>Fonctionnalités</h3>
          <ul className="list-disc p-4">
            <li>
              Mesures instantanées : Prenez des mesures en temps réel simplement en pointant votre caméra vers l&#39;objet à mesurer.
            </li>
            <li>
              Précision élevée : Grâce à la technologie avancée de
              reconnaissance d&#39;images, obtenez des résultats précis même sur des
              surfaces complexes.
            </li>
            <li>
              Simplicité d&#39;utilisation : Aucun matériel supplémentaire n&#39;est
              nécessaire. Il suffit d&#39;ouvrir l&#39;application, de viser et de
              mesurer.
            </li>
            <li>
              Conversion d&#39;unités : Vous pouvez passer d&#39;une unité de mesure à
              une autre en un clin d&#39;œil (centimètres, mètres, pouces, etc.).
            </li>
            <li>
              Mesures multiples : Effectuez plusieurs mesures sans avoir à
              reprendre vos repères.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly items-center gap-4 h-3/4 snap-center">
        <div className="flex-1 gap-4">
          <Image
            className="w-full p-4"
            src="/echelle.jpg"
            alt="image demonstration"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className="flex-2">
          <h3>Utilisation</h3>
          <ul className="list-disc p-4">
            <li>
              Mesurez des meubles avant d&#39;acheter pour être sûr qu&#39;ils
              s&#39;adaptent parfaitement à votre espace.
            </li>
            <li>Calculez la superficie d&#39;une pièce en quelques secondes.</li>
            <li>
              Prenez des mesures de bricolage pour éviter les erreurs lors de
              vos projets.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly items-center gap-4 h-3/4 snap-center">
        <p>
          <b>Prêt à essayer ?<br /></b> Téléchargez notre application dès maintenant
          et transformez votre téléphone en un outil de mesure ultra-pratique !
        </p>
      </div>
    </main>
      <Footer />
    </div>
  );
}
