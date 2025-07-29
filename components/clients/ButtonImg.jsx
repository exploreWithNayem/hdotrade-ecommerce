import banner1 from "@/public/client/buttonimg.png";
import banner2 from "@/public/client/buttonimg2.png";

export default function ButtonImg() {
  return (
    <div className="flex w-[1279px] h-[766px] mx-auto flex-col md:flex-row gap-4 p-4">
      {/* SIT Part Card */}
      <div
        className="flex-1 rounded-xl bg-cover bg-center p-6 flex flex-col items-center justify-center shadow-md"
        style={{ backgroundImage: `url(${banner1.src})` }}
      >
        <button className="bg-red-600 text-white px-8 py-2 rounded-full mt-[-150px]">
          Shop now
        </button>
      </div>

      {/* Robertshaw Part Card */}
      <div
        className="flex-1 rounded-xl bg-cover bg-center p-6 flex flex-col items-center justify-center shadow-md"
        style={{ backgroundImage: `url(${banner2.src})` }}
      >
        <button className="bg-red-600 text-white px-8 py-2 rounded-full mt-[-150px]">
          Shop now
        </button>
      </div>
    </div>
  );
}
