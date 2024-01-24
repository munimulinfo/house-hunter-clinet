import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSkating } from "react-icons/fa";
import { useSelector } from "react-redux";
import { usePostBookedHouseMutation } from "../../redux/api/baseApi";
import { toast } from "react-hot-toast";

const BookModal = ({ house }) => {
  console.log(house);
  const [isOpen, setIsOpen] = useState(false);
  const [postBookedHouse, { isLoading }] = usePostBookedHouseMutation();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handBookSubmit = async (data) => {
    try {
      setLoading(true);
      const bookedHouse = {
        name: user?.name,
        email: user?.email,
        phoneNumber: data.phoneNumber,
        house: {
          name: house?.name,
          address: house?.address,
          city: house?.city,
          bedrooms: house?.bedrooms,
          bathrooms: house?.bathrooms,
          roomSize: house?.roomSize,
          picture: house?.picture,
          availabilityDate: house?.availabilityDate,
          rentPerMonth: house?.rentPerMonth,
          phoneNumber: house?.phoneNumber,
          description: house?.description,
          userId: house?.userId,
        },
      };
      await postBookedHouse(bookedHouse);
      toast.success("hose booked succesfull");
      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={openModal}
        className={`btn ${
          user?.role === "house-renter"
            ? " btn-success"
            : "btn-disabled bg-gray-400"
        } btn-sm uppercase font-serif text-white`}
      >
        Book Now
      </div>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom h-full  sm:modal-middle md:w-1/4 w-full mx-auto"
          open
        >
          <form
            onSubmit={handleSubmit(handBookSubmit)}
            className="rounded-lg border-[3px] border-emerald-300 py-5  px-5 relative bg-gray-200 w-full auth-shadow"
            action=""
          >
            <h1 className="text-2xl text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
              Book House
            </h1>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold font-serif text-emerald-500">
                  name
                </span>
              </label>
              <input
                defaultValue={user?.name}
                readOnly
                type="text"
                className="input "
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold font-serif text-emerald-500">
                  Email
                </span>
              </label>
              <input
                defaultValue={user?.email}
                readOnly
                type="email"
                className="input"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold font-serif text-emerald-500">
                  PhoneNumber
                </span>
              </label>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^(\+)?(88)?01[0-9]{9}$/,
                })}
                placeholder="Enter phoneNumber"
                className="input input-bordered"
              />
              {errors.phoneNumber && (
                <span className="text-rose-500 animate-pulse">
                  Please provide a valid Bangladeshi phone number
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn bg-emerald-400 mt-4 hover:bg-lime-400 w-full text-white"
            >
              {loading || isLoading ? (
                <FaSkating className="animate-bounce" />
              ) : (
                "Booked House"
              )}
            </button>
            <div className="modal-action">
              <button
                className="btn btn-circle bg-red-500 absolute top-2 right-2 p-2 hover:bg-rose-400 text-white "
                onClick={closeModal}
              >
                X
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default BookModal;
