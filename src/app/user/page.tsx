"use client";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div>
      Hello user
      <div>Details</div>
    </div>
  );
};

export default Home;
