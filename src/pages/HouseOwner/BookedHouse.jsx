import React from "react";
import HouseDetails from "../HouseOwner/HouseDetails";
import { useSelector } from "react-redux";
import { useGetBookedHouseOwnerQuery } from "../../redux/api/baseApi";

const BookedHouse = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: bookedHouse, isloding } = useGetBookedHouseOwnerQuery(
    user?.userId
  );
  if (isloding) {
    return <p>Loding.....</p>;
  }
  return (
    <div className="mt-14">
      <table className="overflow-x-auto table  border border-gray-400 bg-green-50 ">
        {/* head */}
        <thead className=" text-black font-semiboald font-serif text-[16px]">
          <tr className="">
            <th>Sl</th>
            <th>House Photo</th>
            <th>House Booked By</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {bookedHouse?.data?.map((house, index) => (
            <tr key={index} className="border-b border-slate-3">
              <td>{index + 1}</td>
              <td>
                <img
                  className="mask rounded w-14 h-14"
                  src={house?.house?.picture}
                  alt="medicine"
                />
              </td>
              <td className="font-medium">{house?.name}</td>
              <td>
                <HouseDetails {...house?.house}></HouseDetails>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookedHouse;
