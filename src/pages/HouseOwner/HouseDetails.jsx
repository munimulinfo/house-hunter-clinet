import React, { useState } from "react";

const HouseDetails = ({
  name,
  address,
  city,
  bedrooms,
  bathrooms,
  roomSize,
  picture,
  availabilityDate,
  rentPerMonth,
  phoneNumber,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="btn btn-xs bg-green-600 text-white  hover:bg-green-600 px-2"
      >
        deltails
      </button>

      {/* Forms inclued */}
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 sm:modal-middle md:w-1/2 mx-auto"
          open
        >
          <div className="card w-96 bg-base-100 relative shadow-xl">
            <figure>
              <img src={picture} alt="home" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {name}
                <div className="badge badge-secondary">HOUSE</div>
              </h2>
              <p>
                <span className="text-[14px] font-bold">address:</span>
                {address}
              </p>
              <p>
                <span className="text-[14px] font-bold">city:</span>
                {city}
              </p>
              <p>
                <span className="text-[14px] font-bold">bedrooms:</span>
                {bedrooms}
              </p>
              <p>
                <span className="text-[14px] font-bold">bathrooms:</span>
                {bathrooms}
              </p>
              <p>
                <span className="text-[14px] font-bold">roomSize:</span>
                {roomSize}
              </p>
              <p>
                <span className="text-[14px] font-bold">phoneNumber:</span>
                {phoneNumber}
              </p>
              <p>
                <span className="text-[14px] font-bold">availabilityDate:</span>
                {availabilityDate}
              </p>
              <p>
                <span className="text-[14px] font-bold">rentPerMonth:</span>
                {rentPerMonth}
              </p>
              <p>
                <span className="text-[14px] font-bold">description:</span>
                {description}
              </p>
              <div className="modal-action">
                <button
                  className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                  onClick={closeModal}
                >
                  &#10005;
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default HouseDetails;
