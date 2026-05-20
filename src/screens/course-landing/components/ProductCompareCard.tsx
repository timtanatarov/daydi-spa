import type { ProductCompareItem } from "../lib/content";
import { imgImage60 } from "../lib/landingAssets";

type Props = {
  item: ProductCompareItem;
};

export function ProductCompareCard({ item }: Props) {
  return (
    <article className="flex w-[140px] shrink-0 flex-col">
      <div className="relative h-[131px] w-full overflow-hidden bg-[#dcd7d1]">
        <img
          src={imgImage60}
          alt=""
          className="size-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="bg-white px-2 py-1.5 text-[10px] leading-tight text-[#49301c]">
        <p className="line-through opacity-70">{item.oldPrice}</p>
        <p>
          <span className="font-semibold">{item.discount}</span>
        </p>
        <p className="text-sm font-bold">{item.price}</p>
      </div>
      <p className="mt-1 text-center font-serif text-[10px] lowercase text-[#49301c]">
        {item.brand}
      </p>
    </article>
  );
}
