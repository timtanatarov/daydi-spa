import Image from "next/image";

import { staticProductCompare } from "../lib/landingAssets";

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
        <Image src={staticProductCompare} alt="" fill sizes="140px" className="object-cover" />
      </div>

      <p className="mt-1 text-center text-[10px] font-medium lowercase text-[#49301c]">
        {item.brand}
      </p>
    </article>
  );
}
