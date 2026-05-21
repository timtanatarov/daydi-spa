import type { PaperShowcaseSectionProps } from "../sections/PaperShowcaseSection";

const zaraTaobaoPair = {
  left: {
    brand: "zara",
    price: "3 914 ₽",
    oldPrice: "7 385 ₽",
    discount: "-47%",
  },
  right: {
    brand: "taobao",
    price: "3 914 ₽",
    oldPrice: "7 385 ₽",
    discount: "-47%",
  },
};

export const paperShowcaseSections: PaperShowcaseSectionProps[] = [
  {
    title: ["вот такие наценки", "на обычной одежде,", "обуви и аксессуарах"],
    pairs: [zaraTaobaoPair, zaraTaobaoPair],
  },
  {
    title: ["а такая разница", "в товарах для дома"],
    subtitle: "можно обустроить квартиру как из pinterest, но в 3-5 раз дешевле, чем у нас!",
    pairs: [zaraTaobaoPair, zaraTaobaoPair],
  },
  {
    title: ["еще можно заказывать", "бренды, по которым", "мы соскучились"],
    subtitle: "с выгодой до 70%",
    pairs: [zaraTaobaoPair, zaraTaobaoPair],
  },
];
