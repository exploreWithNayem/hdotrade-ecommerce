import banner1 from "@/public/client/banner/button1.png";
import banner2 from "@/public/client/banner/button2.png";

export default function ButtonImg() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-[1279px] mx-auto">
      {/* Card 1 */}
      <div
        className="relative bg-cover bg-center rounded-xl shadow-md h-[400px] md:h-[766px]"
        style={{ backgroundImage: `url(${banner1.src})` }}
      >
        <div className="absolute inset-0 flex mb-[130px] flex-col justify-end md:justify-center items-center p-4">
          <button className="bg-red-600 text-white w-full md:w-auto max-w-[150px] px-4 lg:px-8 transition hover:translate-y-1 py-2 rounded-full text-sm sm:text-base">
            Shop now
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="relative bg-cover bg-center rounded-xl shadow-md h-[400px] md:h-[766px]"
        style={{ backgroundImage: `url(${banner2.src})` }}
      >
        <div className="absolute inset-0 flex mb-[130px] flex-col justify-end md:justify-center items-center p-4">
          <button className="bg-red-600 text-white w-full md:w-auto max-w-[150px] px-4 lg:px-8 transition hover:translate-y-1 py-2 rounded-full text-sm sm:text-base">
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
}
