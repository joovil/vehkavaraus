import { auth } from "@/lib/utils/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-blue-300 w-full flex flex-col justify-center items-center">
      <span>Hello</span>
      {user && <span>{user.username}</span>}
      <button onClick={() => console.log("hello")}>Test button</button>
    </div>
  );
}
