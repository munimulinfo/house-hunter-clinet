import { FaTrash } from "react-icons/fa";
import AddHouse from "./AddHouse";
import {
  useAllOwnerHouseQuery,
  useDeletHouseMutation,
} from "../../redux/api/baseApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import EditHouse from "./EditHouse";
import HouseDetails from "./HouseDetails";

const AllHouse = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: allHouse, isLoading } = useAllOwnerHouseQuery(user.userId);
  const [deletHouse] = useDeletHouseMutation();
  if (isLoading) {
    return <p>Loding...</p>;
  }

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
        deletHouse(id);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  return (
    <div className="mt-14">
      <div className="flex lg:justify-end items-center mb-5">
        <AddHouse></AddHouse>
      </div>

      <table className="overflow-x-auto table  border border-gray-400 bg-green-50 ">
        {/* head */}
        <thead className=" text-black font-semiboald font-serif text-[16px]">
          <tr className="">
            <th>Sl</th>
            <th>House Photo</th>
            <th>HouseName</th>
            <th>View Details</th>
            <th>Edit House</th>
            <th>Delet House</th>
          </tr>
        </thead>
        <tbody>
          {allHouse?.data?.map((house, index) => (
            <tr key={index} className="border-b border-slate-3">
              <td>{index + 1}</td>
              <td>
                <img
                  className="mask rounded w-14 h-14"
                  src={house?.picture}
                  alt="medicine"
                />
              </td>
              <td className="font-medium">{house?.name}</td>
              <td>
                <HouseDetails {...house}></HouseDetails>
              </td>

              <td className="space-x-2">
                <EditHouse {...house}></EditHouse>
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

export default AllHouse;
