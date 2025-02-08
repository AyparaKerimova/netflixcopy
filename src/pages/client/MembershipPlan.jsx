import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateMembershipMutation } from "../../store/api/authApi"; 

const plans = [
  {
    id: "standard",
    name: "Standard",
    price: "EUR 9.99",
    resolution: "1080p (Full HD)",
    streams: 2,
    downloads: 2,
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR 11.99",
    resolution: "4K (Ultra HD) + HDR",
    streams: 4,
    downloads: 6,
  },
];

const MembershipPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [updateMembership] = useUpdateMembershipMutation();

  const handlePlanSelect = async (planId) => {
    setSelectedPlan(planId);
    try {
      await updateMembership({ membershipType: planId }).unwrap();
      console.log("Membership updated successfully");
    } catch (error) {
      console.error("Failed to update membership:", error);
    }
  };

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
      <div className="m-12">
        <p className="mt-2">STEP 2 OF 3</p>
        <h1 className="text-3xl font-medium w-96 mt-2 text-gray-800">
          Choose the plan that’s right for you
        </h1>
      </div>
      <div className="flex gap-6 justify-center mt-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handlePlanSelect(plan.id)}
            className={`cursor-pointer p-6 w-80 rounded-lg shadow-lg border-2 ${
              selectedPlan === plan.id
                ? "border-red-600 bg-gradient-to-br from-red-500 to-purple-600 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          >
            {selectedPlan === plan.id && (
              <div className="bg-red-600 text-white text-sm px-3 py-1 rounded-full w-fit mb-2">
                ✅ Selected
              </div>
            )}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-sm">{plan.resolution}</p>
            <p className="text-lg font-semibold mt-2">{plan.price}</p>
            <p className="text-sm mt-2">
              Devices you can watch at the same time: {plan.streams}
            </p>
            <p className="text-sm mt-2">Download devices: {plan.downloads}</p>
          </div>
        ))}
      </div>
      <p className="mt-40 text-gray-500 text-center ">
        HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
        to your internet service and device capabilities. Not all content is
        available in all resolutions. See our{" "}
        <a
          className="text-blue-400"
          href="https://help.netflix.com/legal/termsofuse"
        >
          Terms of Use
        </a>{" "}
        for more details. Only people who live with you may use your account.
        Watch on 4 different devices at the same time with Premium, 2 with
        Standard and 1 with Basic. Live events are included with any Netflix
        plan and contain ads.
      </p>
      <Link to="/payment" className="bg-red-600 text-white px-44 py-6 rounded text-2xl flex items-center justify-center w-24 mx-auto mt-24">Next</Link>
    </>
  );
};

export default MembershipPlan;
