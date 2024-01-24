import React from "react";
import { useGetallHouseQuery } from "../redux/api/baseApi";
import BookModal from "./HouseRenter/BookModal";

const Home = () => {
  const { data: allhouse, isLoading } = useGetallHouseQuery();
  if (isLoading) {
    return <p>loging....</p>;
  }
  console.log(allhouse);
  return (
    <div className="mt-14 mb-20">
      <div>
        <h1 className="text-center animate-pulse md:text-4xl text-lg font-sans font-bold uppercase text-emerald-500">
          Search Your Dreem House <br /> And Book NoW
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-8">
          <input
            type="text"
            placeholder="search by house Name"
            className="input input-bordered input-accent w-full max-w-xs"
          />
          <select className="select select-accent w-full max-w-xs">
            <option disabled selected>
              Filter With Value
            </option>
            <option>Auto</option>
            <option>Dark mode</option>
            <option>Light mode</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols lg:grid-cols-3 gap-10 md:mx-20 md:mt-20">
        {allhouse?.map((house, index) => (
          <div
            key={index}
            className="card w-full max-w-96 h-full bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-full h-[230px]"
                src={house?.picture}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <span className="text-emerald-500 font-bold mr-2">
                  House Name :
                </span>
                {house.name}
              </h2>
              <h1>
                <span className="font-semiboald font-serif mr-2  text-emerald-500">
                  Bedrooms:
                </span>
                {house.bedrooms}
              </h1>
              <h1>
                <span className="font-semiboald font-serif mr-2 text-emerald-500 ">
                  Room size:
                </span>
                {house?.roomSize}
              </h1>
              <h1>
                <span className="font-semiboald font-serif mr-2 text-emerald-500">
                  Available from:
                </span>
                {house?.availabilityDate}
              </h1>
              <h1>
                <span className="font-semiboald font-serif mr-2 text-emerald-500 ">
                  Phone number:
                </span>
                {house?.phoneNumber}
              </h1>
              <h1>
                <span className="font-semiboald font-serif mr-2 text-emerald-500 ">
                  Rent per month:
                </span>
                {house?.rentPerMonth}
              </h1>
              <div className="card-actions justify-end"></div>
              <div>
                <BookModal house={house}></BookModal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

address: "Dhaka Bangadesh";
availabilityDate: "2024-01-10T00:00:00.000Z";
bathrooms: 23;
bedrooms: 22;
city: "Dhaka";
description: "NISSAN VALO KMN ASO BAPU TMI HARMAR";
name: "munimul";
phoneNumber: "01799846537";
picture: "https://i.ibb.co/TgWHx0Z/Screenshot-9.png";
rentPerMonth: 3243;
roomSize: 23;
