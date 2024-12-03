"use client";

import GameCard from "@/app/(routes)/games/components/GameCard";
import { getAllGamesAction } from "@/lib/actions/games/getAllGamesAction";
import { getGameByIdService } from "@/lib/services/games/getGameByIdService";
import { Game } from "@/types/game";
import { useEffect, useState } from "react";

const DisplayGames = ({ games }: { games: Game[] }) => {
  const [clientGames, setClientGames] = useState<Game[]>(games);

  useEffect(() => {
    const fetchGames = async () => {
      setClientGames(await getAllGamesAction());
    };
    fetchGames();
  }, []);

  const updateGames = async (id: number) => {
    const updatedGame = await getGameByIdService(id);
    console.log(updatedGame);

    setClientGames((prevGames) =>
      prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
    );
  };

  return (
    <div className="">
      <div className="w-1/2 gap-y-8 m-auto flex flex-col grid-cols-[repeat(auto-fit,minmax(300px,auto))] items-center min-[1250px]:justify-between min-[1250px]:grid">
        {clientGames.map((g) => (
          <GameCard key={g.id} game={g} updateGames={updateGames} />
        ))}
      </div>
    </div>
  );
};

export default DisplayGames;
