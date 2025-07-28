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
    <section className="w-[80%] mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
        Featured Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 justify-items-center">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div
              className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${cat.color} flex items-center justify-center overflow-hidden`}
            >
              <Image
                src={cat.img}
                alt={cat.name}
                className="w-14 h-14 object-contain"
                width={100}
                height={100}
              />
            </div>
            <p className="mt-2 text-xs md:text-sm">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
