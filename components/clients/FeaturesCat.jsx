import cat1 from "@/public/client/cat1.png";
import cat2 from "@/public/client/cat2.png";
import cat3 from "@/public/client/cat3.png";
import cat4 from "@/public/client/cat4.png";
import cat5 from "@/public/client/cat5.png";
import cat6 from "@/public/client/cat6.png";
import Image from "next/image";

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Dishwasher Spare Parts",
      color: "bg-pink-100",
      img: cat1,
    },
    {
      name: "Vegetable cutter spare parts",
      color: "bg-purple-100",
      img: cat2,
    },
    {
      name: "Juicer spare parts",
      color: "bg-pink-200",
      img: cat3,
    },
    {
      name: "Hand mixer spare parts",
      color: "bg-blue-100",
      img: cat4,
    },
    {
      name: "Food processor/ bowl cutters spare parts",
      color: "bg-green-100",
      img: cat5,
    },
    {
      name: "Cooking application spare parts",
      color: "bg-orange-100",
      img: cat6,
    },
  ];

  return (
    <section className="max-w-[1276px] w-full mx-auto py-12 px-4">
      <h2 className="text-center font-bold text-[#1A1D21] text-[28px] sm:text-[32px] md:text-[48px] mb-8">
        Featured Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-full"
          >
            <div
              className={`w-40 h-40 sm:w-32 sm:h-32 lg:w-[184px] lg:h-[184px] rounded-full ${cat.color} flex items-center justify-center overflow-hidden`}
            >
              <Image
                src={cat.img}
                alt={cat.name}
                className="object-contain"
                width={130}
                height={130}
              />
            </div>
            <p className="mt-2 text-sm md:text-base">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
