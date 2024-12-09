import { clearTest } from "@/lib/actions/clearCache";
import { formatDate } from "@/lib/utils/formatDate";

const BorrowRow = async ({ borrow }: { borrow: any }) => {
  const returnGame = async (formData: FormData) => {
    "use server";
    console.log("hello");
    clearTest();
  };

  return (
    <form
      action={returnGame}
      className="grid grid-cols-3 text-xl gap-y-3"
      // style={{ display: visible ? "block" : "none" }}
    >
      <span className="flex items-center">{borrow.name}</span>
      <span className="flex items-center">{formatDate(borrow.borrowDate)}</span>
      <button
        className="btn-primary disabled:bg-greenDisabledV"
        // disabled={disabled}
        // onClick={handleReturn}
      >
        Mark returned
      </button>
    </form>
  );
};

export default BorrowRow;
