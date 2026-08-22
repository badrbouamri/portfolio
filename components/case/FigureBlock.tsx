import Image from "next/image";

type FigureBlockProps = {
  src: string;
  alt: string;
  caption: string;
  number: number;
  confidential?: boolean;
};

export function FigureBlock({ src, alt, caption, number, confidential }: FigureBlockProps) {
  return (
    <figure className="my-6 border border-rule bg-surface p-2">
      <Image src={src} alt={alt} width={1200} height={800} className="h-auto w-full" />
      <figcaption className="mt-2 px-1 text-sm text-steel">
        <span className="font-data">Fig. {number}</span> — {caption}
        {confidential ? (
          <span className="ml-1 italic">(donnée indexée/anonymisée)</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
