import { ScallopEdgeStrip } from "../ui/ScallopEdgeStrip";

type Props = {
  src: string;
};

/** Перфорация между секциями (бывший div на top:722px) */
export function SectionDivider({ src }: Props) {
  return (
    <div
      className="pointer-events-none relative z-20 -mt-px h-[60px] w-full overflow-hidden"
      aria-hidden
    >
      <ScallopEdgeStrip src={src} />
    </div>
  );
}
