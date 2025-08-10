import Image from "next/image";

const BrandLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={"/images/logos/logo-dark.png"}
        alt="Header background"
        priority
        quality={100}
        width={50}
        height={50}
      />
      <span className="text-lg font-semibold">Panda Filmes</span>
    </div>
  );
};

export default BrandLogo;
