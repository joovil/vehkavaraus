import borrowRepository from "@/database/repositories/borrowRepository";
import { auth } from "@/lib/utils/auth";
import { UserUpdate } from "@/types/user";
import BorrowRow from "./BorrowRow";
import SettingsForms from "./SettingsForms";

const cols = ["Games borrowed", "Return date", "Return"];

const Home = async () => {
  const session = await auth();
  const borrows = await borrowRepository.getBorrowByIdWithGame(
    session!.user.id
  );
  // console.log(borrows);

  return (
    <div className="w-1/2 m-auto flex flex-col gap-y-6">
      <div className="box-basic">
        <h2>{session?.user.username}</h2>
        <div className="grid grid-cols-3 text-xl gap-y-3">
          {cols.map((col) => (
            <h3 key={col}>{col}</h3>
          ))}
          {borrows.map((borrow) => (
            <BorrowRow key={borrow.name} borrow={borrow} />
          ))}
        </div>
      </div>
      <SettingsBox userId={session!.user.id} />
    </div>
  );
};

const validValues = (val1: string, val2: string): boolean => {
  return !!val1 && !!val2 && val1 === val2;
};

const SettingsBox = async ({ userId }: { userId: string }) => {
  // TODO: Move to client componen for better error handling
  const handlePasswordChange = async (formData: FormData) => {
    "use server";

    throw Error("error thrown");
    return "error";
    // const newPassword = formData.get("val1") as string;
    // const newPassword2 = formData.get("val2") as string;

    // if (!validValues(newPassword, newPassword2)) return;
    // console.log(newPassword, newPassword2);

    // const password_hash = await bcryptjs.hash(newPassword, 10);

    // const update: UserUpdate = {
    //   password_hash,
    // };

    // await updateUser(userId, update);
  };

  // TODO: Move to client componen for better error handling
  const handleApartmentChange = async (formData: FormData) => {
    "use server";

    const newApartment = formData.get("val1") as string;
    const newApartment2 = formData.get("val2") as string;

    checkValues(newApartment, newApartment2);

    console.log(newApartment, newApartment2);
    const update: UserUpdate = {
      apartment: newApartment,
    };

    // await updateUser(userId, update);
  };

  return (
    <div className="box-basic">
      <div className="flex">
        <h2 className="mb-3">Settings</h2>
      </div>
      <SettingsForms />
      {/* <div className="flex justify-evenly"> */}
      {/* <SingleForm */}
      {/* setting="password" */}
      {/* inputType="password" */}
      {/* handler={handlePasswordChange} */}
      {/* /> */}
      {/* <SingleForm setting="apartment" handler={handleApartmentChange} /> */}
      {/* </div> */}
    </div>
  );
};

// const SettingsForm = ({
//   setting,
//   handler,
// }: {
//   setting: string;
//   handler: any;
// }) => {
//   return (
//     <>
//       <div className="basis-0 flex-grow relative">
//         <h3 className="mb-2">Change {setting}</h3>
//         <form className="settings-form" action={handler}>
//           <div>
//             <label>New {setting}</label>
//             <input name="val1" type="text" placeholder={`New ${setting}`} />
//           </div>

//           <div>
//             <label className="w-fit">New {setting} again</label>
//             <input name="val2" type="text" placeholder={`New ${setting}`} />
//           </div>
//           <button className="btn-primary">Update {setting}</button>
//           <div className="absolute -bottom-10 w-fit m-auto py-1 px-2 bg-red-200 text-lg text-center shadow-md">
//             Provided values are invalid
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

export default Home;
