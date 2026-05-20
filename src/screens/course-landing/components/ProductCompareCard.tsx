import { imgProductCompare } from "../lib/landingAssets";

type Props = {
  item: {
    brand: string;
    price: string;
    oldPrice: string;
    discount: string;
  };
};

export function ProductCompareCard({ item }: Props) {
  return (
    <article className="flex w-[140px] shrink-0 flex-col">
      <div className="relative h-[131px] w-full overflow-hidden bg-[#dcd7d1]">
        <img
          src={imgProductCompare}
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
      <p className="mt-1 text-center text-[10px] font-medium lowercase text-[#49301c]">
        {item.brand}
      </p>
    </article>
  );
}
