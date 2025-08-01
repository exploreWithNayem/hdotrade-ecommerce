import Banner2 from "@/components/clients/Banner2";
import ButtonImg from "@/components/clients/ButtonImg";
import FeaturedCategories from "@/components/clients/FeaturesCat";
import FilterC from "@/components/clients/FilterC";
import ImageBanners from "@/components/clients/ImageBanner";
import OurBrand from "@/components/clients/OurBrand";
import Banner from "@/components/home/Banner";

import { getLang } from "@/languages/dynamicLangSwitch";

export default async function Home(props) {
  const params = await props.params;

  const { lang } = params;
  const language = await getLang(lang);

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-[#ffffff] px-4">
      <FilterC />
      <Banner lanCode={lang} heroLang={language?.home?.hero} />
      <ImageBanners />
      <ButtonImg />
      <FeaturedCategories />
      <Banner2 />
      <OurBrand />
    </div>
  );
}
