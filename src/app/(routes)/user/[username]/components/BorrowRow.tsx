import { formatDate } from "@/lib/utils/formatDate";
import ReturnButton from "./ReturnButton";

interface borrowProp {
  gameId: number;
  borrowDate: Date;
  dueDate: Date;
  borrowStatus: "free" | "borrowed" | "late";
  name: string;
  borrowId: number;
}

const BorrowRow = ({ borrow }: { borrow: borrowProp }) => {
  return (
    <div className="grid grid-cols-3 text-xl gap-y-3">
      <span className="flex items-center">{borrow.name}</span>
      <span className="flex items-center">{formatDate(borrow.borrowDate)}</span>
      <ReturnButton>Return game</ReturnButton>
    </div>
  );
};

export default BorrowRow;
