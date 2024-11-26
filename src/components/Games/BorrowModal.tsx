"use client";

import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

export default function BorrowModal({
  setVisible,
  gameId,
}: {
  setVisible: Dispatch<SetStateAction<boolean>>;
  gameId: number;
}) {
  const session = useSession();
  console.log(session);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apartment = e.target.apartment.value;

    // TODO: Handle borrowing for logged in user
    if (session.data?.user) {
      console.log("not implemented");
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible((v) => !v);
  };

  return (
    <div className="">
      <div className="absolute bottom-0 bg-offWhiteV flex p-3 gap-3 m-2 shadow-primary">
        {/* <div className="flex gap-3"> */}
        <button className="btn-primary" type="submit">
          Submit
        </button>
        <button className="btn-primary" type="button" onClick={handleCancel}>
          Cancel
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
