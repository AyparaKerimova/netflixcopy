import React from "react";
import { Link } from "react-router-dom";

const ClientPayment = () => {
  return (
    <>
      <nav className="flex items-center justify-between">
        <img
          className="ml-4"
          width="200"
          height="200"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
        <Link to="/" className="mr-20 text-xl font-medium">
          <h5>Sign Out</h5>
        </Link>
      </nav>
      <hr />
      <div className="flex flex-col items-center justify-center mt-48 text-center gap-4">
        <img
          width="50"
          height="50"
          src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Lock.png"
          alt=""
        />
        <p className="mt-4">STEP 3 OF 3</p>
        <h2 className="text-3xl font-semibold w-74">Choose how to pay</h2>
        <p className="w-80 text-lg">
          Your payment is encrypted and you can change how you pay anytime.
        </p>
        <Link
          to="/client/dashboard"
          className="bg-white border text-black px-44 py-6 rounded"
        >
        Pay for registration <span className="text-xl">&gt;</span>
        </Link>
      </div>
    </>
  );
};

export default ClientPayment;
