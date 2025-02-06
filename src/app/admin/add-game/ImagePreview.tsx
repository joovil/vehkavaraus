import Image from "next/image";
import { useEffect, useState } from "react";

export const ImagePreview = ({ file }: { file: File | null }) => {
  const [imgUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    setImageUrl(URL.createObjectURL(file) as string);
  }, [file]);

  return (
    <div className="relative aspect-square lg:h-full xl:w-full">
      {file && imgUrl ? (
        <Image
          src={imgUrl}
          alt="Image of new game"
          fill
          unoptimized
        />
      ) : (
        <div className="mt-auto flex aspect-square items-center justify-center bg-inputGreenV">
          <span className="text-2xl">Image preview</span>
        </div>
      )}
    </div>
  );
};
