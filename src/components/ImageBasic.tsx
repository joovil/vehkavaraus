import Image from "next/image";

const ImageBasic = ({
  src,
  size = "300px",
}: {
  src?: string | undefined;
  size?: string | undefined;
}) => {
  return (
    <div className={`relative`} style={{ width: size, height: size }}>
      <Image
        src={src || "/fallbackGame.png"}
        alt="Picture of a board game"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default ImageBasic;
