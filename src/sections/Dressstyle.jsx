import DressStyle1 from "../assets/Images/DressStyle1.png";
import DressStyle2 from "../assets/Images/DressStyle2.png";
import DressStyle3 from "../assets/Images/DressStyle3.png";
import DressStyle4 from "../assets/Images/DressStyle4.png";

export default function DressStyle() {
  return (
    <section className="px-4 py-10 mx-auto max-w-7xl md:px-6">
      <div className="bg-[#F0EEEE] rounded-[30px] px-6 md:px-10 py-10">
        <h2 className="text-center text-[28px] md:text-[36px] lg:text-[40px] font-black uppercase tracking-tight text-gray-900 mb-8">
          Browse by Dress Style
        </h2>

        <div className="flex flex-col gap-4 md:hidden">
          {[
            { name: "Casual", img: DressStyle1 },
            { name: "Formal", img: DressStyle2 },
            { name: "Party", img: DressStyle3 },
            { name: "Gym", img: DressStyle4 },
          ].map(({ name, img }) => (
            <div
              key={name}
              className="relative bg-white rounded-[20px] overflow-hidden cursor-pointer h-[200px]"
            >
              {img ? (
                <img
                  src={img}
                  alt={name}
                  className="absolute inset-0 object-cover object-top w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-100" />
              )}
              <span className="absolute z-10 text-lg font-black text-gray-900 top-4 left-5">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-1">
              <div className="relative bg-white rounded-[20px] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md h-[250px]">
                <img
                  src={DressStyle1}
                  alt="Casual"
                  className="absolute inset-0 object-cover object-top w-full h-full"
                />
                <span className="absolute z-10 text-lg font-black text-gray-900 top-4 left-5">
                  Casual
                </span>
              </div>
            </div>
            <div className="col-span-2">
              <div className="relative bg-white rounded-[20px] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md h-[250px]">
                <img
                  src={DressStyle2}
                  alt="Formal"
                  className="absolute inset-0 object-cover object-top w-full h-full"
                />
                <span className="absolute z-10 text-lg font-black text-gray-900 top-4 left-5">
                  Formal
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="relative bg-white rounded-[20px] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md h-[250px]">
                <img
                  src={DressStyle3}
                  alt="Party"
                  className="absolute inset-0 object-cover object-top w-full h-full"
                />
                <span className="absolute z-10 text-lg font-black text-gray-900 top-4 left-5">
                  Party
                </span>
              </div>
            </div>
            <div className="col-span-1">
              <div className="relative bg-white rounded-[20px] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md h-[250px]">
                <img
                  src={DressStyle4}
                  alt="Gym"
                  className="absolute inset-0 object-cover object-top w-full h-full"
                />
                <span className="absolute z-10 text-lg font-black text-gray-900 top-4 left-5">
                  Gym
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
