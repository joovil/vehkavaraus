import { auth } from "@/lib/utils/auth";

export default async function Debug() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-green-300 w-fit flex flex-col">
      <span>Hello</span>
      {user && <span>{user.username}</span>}
    </div>
  );
}
