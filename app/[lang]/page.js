import FeaturedCategories from "@/components/clients/FeaturesCat";
import FilterC from "@/components/clients/FilterC";
import ImageBanners from "@/components/clients/ImageBanner";
// import Ads from "@/components/home/Ads";
import Banner from "@/components/home/Banner";
// import Categories from "@/components/home/Categories";
// import Feature from "@/components/home/Feature";
// import NewArrival from "@/components/home/NewArrival";
import TrendingProducts from "@/components/home/TrendingProducts";
import { getLang } from "@/languages/dynamicLangSwitch";
import { Suspense } from "react";

export default async function Home(props) {
  const params = await props.params;

  const { lang } = params;
  const language = await getLang(lang);

  return (
    <>
      <FilterC />
      <Banner lanCode={lang} heroLang={language?.home?.hero} />
      {/* <Feature featureLang={language?.home?.feature} /> */}

      <ImageBanners />
      <FeaturedCategories />

      {/* <Categories langCode={lang} categoryLang={language?.home?.category} /> */}

      {/* <Suspense fallback={<h1> Loading....................</h1>}>
        <NewArrival langCode={lang} nawLang={language} />
      </Suspense> */}

      {/* <Ads /> */}
      <Suspense fallback={<h1> Loading....................</h1>}>
        <TrendingProducts langCode={lang} trendLang={language} />
      </Suspense>
    </>
  );
}
