import Image from "next/image";
import { useEffect, useState } from "react";

export const ImagePreview = ({ file }: { file: File | null }) => {
  const [imgUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    setImageUrl(URL.createObjectURL(file) as string);
  }, [file]);

  return (
    <div className="relative h-80 w-80">
      {file && imgUrl ? (
        <Image
          src={imgUrl}
          alt="Image of new game"
          fill
          unoptimized
        />
      ) : (
        <div className="mt-auto flex h-full w-full items-center justify-center bg-inputGreenV">
          <span className="text-2xl">Image preview</span>
        </div>
      )}
    </div>
  );
};
