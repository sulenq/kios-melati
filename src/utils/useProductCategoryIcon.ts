import {
  BeerStein,
  DotsThreeCircle,
  FirstAidKit,
  Hamburger,
  Lightning,
  PencilLine,
  Shower,
  Sparkle,
} from "@phosphor-icons/react";

const useProductCategoryIcon = (category: string) => {
  switch (category) {
    case "food":
      return Hamburger;
    case "drink":
      return BeerStein;
    case "stationery":
      return PencilLine;
    case "hygiene":
      return Shower;
    case "medicine":
      return FirstAidKit;
    case "electronic":
      return Lightning;
    case "cosmetic":
      return Sparkle;
    default:
      return DotsThreeCircle;
  }
};

export default useProductCategoryIcon;
