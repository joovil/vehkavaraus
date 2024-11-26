"use client";

import { useState } from "react";

const BorrowButton = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="relative">
      {visible ? (
        <div className="">
          <button onClick={() => setVisible(!visible)} className="btn-primary">
            Borrow
          </button>
        </div>
      ) : (
        <div className="absolute bg-blue-300">
          <form className="">
            <label>Apartment</label>
            <input type="text" placeholder="apartment" />
            <button>Submit</button>
            <button>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BorrowButton;
