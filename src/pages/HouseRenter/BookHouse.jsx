import React from "react";
import { FaTrash } from "react-icons/fa";
import HouseDetails from "../HouseOwner/HouseDetails";
import {
  useDeletBookedHouseMutation,
  useGetBookedHouseQuery,
} from "../../redux/api/baseApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const BookHouse = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: bookedHouse, isLoading } = useGetBookedHouseQuery(user?.email);
  const [deletBookedHouse] = useDeletBookedHouseMutation();
  if (isLoading) {
    return <p>Loding....</p>;
  }
  console.log(bookedHouse);

  const handleHouseDelet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletBookedHouse(id);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  return (
    <div className="mt-14">
      <table className="overflow-x-auto table  border border-gray-400 bg-green-50 ">
        {/* head */}
        <thead className=" text-black font-semiboald font-serif text-[16px]">
          <tr className="">
            <th>Sl</th>
            <th>House Photo</th>
            <th>HouseName</th>
            <th>View Details</th>
            <th>Delet House</th>
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

              <td>
                <button
                  type="button"
                  onClick={() => handleHouseDelet(house?._id)}
                  className=" bg-red-500 rounded-full bg-opacity-35 "
                >
                  <FaTrash className="text-4xl text-red-500 p-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookHouse;
