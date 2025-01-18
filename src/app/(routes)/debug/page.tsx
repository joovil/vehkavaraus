import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex w-full flex-col items-center justify-center bg-blue-300">
      <span>Hello</span>
      {user && <span>{user.username}</span>}
      <button onClick={() => console.log("hello")}>Test button</button>
    </div>
  );
}
