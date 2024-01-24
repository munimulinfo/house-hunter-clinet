import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSkating } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAddHouseMutation } from "../../redux/api/baseApi";
import { toast } from "react-hot-toast";
const AddHouse = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [addHouse, { data: returnData }] = useAddHouseMutation();

  const [isOpen, setIsOpen] = useState(false);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=1e026c5eba4e0751bd71f1436ae6da99`;

  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  if (!user) {
    return <p>Loding.....</p>;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormData = async (data) => {
    try {
      setLoading(true);
      const imgdata = new FormData();
      imgdata.append("image", data.picture[0]);

      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: imgdata,
      });

      const uploadImage = await response.json();

      if (uploadImage.success) {
        const imgUrl = uploadImage.data.display_url;

        const houseData = {
          userId: user.userId,
          name: data.name,
          address: data.address,
          city: data.city,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          roomSize: data.roomSize,
          picture: imgUrl,
          availabilityDate: data.availabilityDate,
          rentPerMonth: data.rentPerMonth,
          phoneNumber: data.phoneNumber,
          description: data.description,
        };

        addHouse(houseData);
        toast.success("data save successfull");
        reset();
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="py-2  px-7 uppercase  w-full text-center  bg-green-700 hover:bg-green-600 text-white rounded-full text-lg"
        onClick={openModal}
      >
        Add New House
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 sm:modal-middle md:w-1/2 mx-auto"
          open
        >
          <form
            onSubmit={handleSubmit(handleFormData)}
            className="border-[3px] p-8 h-full overflow-y-scroll relative w-full border-gray-300 rounded-lg bg-gray-100  auth-shadow"
            action=""
          >
            <h1 className="text-2xl text-center mb-2 font-serif text-emerald-500 uppercase font-bold ">
              ADD HOUSE REQUIRED FORM FILL-UP
            </h1>
            {/* //first row  */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    House Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter House Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-rose-500 animate-pulse">
                    please provide House Name
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    House Address
                  </span>
                </label>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Enter House Address"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-rose-500 animate-pulse">
                    please provide House Address
                  </span>
                )}
              </div>
            </div>
            {/* // secoond Row  */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    City
                  </span>
                </label>
                <input
                  type="text"
                  {...register("city", { required: true })}
                  placeholder="Enter City"
                  className="input input-bordered"
                />
                {errors.fullName && (
                  <span className="text-rose-500 animate-pulse">
                    please provide City
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    Bedrooms Quantity
                  </span>
                </label>
                <input
                  type="number"
                  {...register("bedrooms", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                  placeholder="Enter Bedrooms Quantity"
                  className="input input-bordered"
                />
                {errors.bedrooms && (
                  <span className="text-rose-500 animate-pulse">
                    please provide Bedrooms Quntity
                  </span>
                )}
              </div>
            </div>
            {/* third row  */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    Bathrooms Quantity
                  </span>
                </label>
                <input
                  type="number"
                  {...register("bathrooms", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                  placeholder="Enter bathrooms Quantity"
                  className="input input-bordered"
                />
                {errors.bathrooms && (
                  <span className="text-rose-500 animate-pulse">
                    please provide bathrooms Quantity
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    RoomSize(squre feet)
                  </span>
                </label>
                <input
                  type="number"
                  {...register("roomSize", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                  placeholder="Enter RoomSize(squre feet)"
                  className="input input-bordered"
                />
                {errors.roomSize && (
                  <span className="text-rose-500 animate-pulse">
                    please provide roomSize
                  </span>
                )}
              </div>
            </div>

            {/* //Fourth row  */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    House Picture
                  </span>
                </label>
                <input
                  type="file"
                  {...register("picture", { required: true })}
                  className="file-input w-full"
                />
                {errors.picture && (
                  <span className="text-rose-500 animate-pulse">
                    please provide Picture
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    Available Date
                  </span>
                </label>
                <input
                  type="date"
                  {...register("availabilityDate", { required: true })}
                  className="input input-bordered"
                />
                {errors.availabilityDate && (
                  <span className="text-rose-500 animate-pulse">
                    please provide Available Date
                  </span>
                )}
              </div>
            </div>
            {/* //Fifth row  */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold font-serif text-emerald-500">
                    RentPerMonth
                  </span>
                </label>
                <input
                  type="number"
                  {...register("rentPerMonth", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                  placeholder="Enter  RentPerMonth"
                  className="input input-bordered"
                />
                {errors.rentPerMonth && (
                  <span className="text-rose-500 animate-pulse">
                    please provide RentPerMonth
                  </span>
                )}
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
            </div>
            {/* //sixth row  */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold font-serif text-emerald-500">
                  Description
                </span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="textarea input-bordered w-full"
                placeholder="house description"
              ></textarea>
              {errors.fullName && (
                <span className="text-rose-500 animate-pulse">
                  please provide house description
                </span>
              )}
            </div>
            <div className="form-control w-full mt-4">
              <button
                type="submit"
                className="btn bg-emerald-500 text-white  font-serif hover:bg-emerald-500 border-0"
              >
                {loading ? (
                  <FaSkating className="animate-bounce" />
                ) : (
                  "Submit Data"
                )}
              </button>
            </div>
            {/* //modal close butto  */}
            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                onClick={closeModal}
              >
                &#10005;
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default AddHouse;
