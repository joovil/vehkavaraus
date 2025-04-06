"use client";

import { AdminGame, BorrowStatusesType, HistoryItem } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BorrowerInfo,
  BorrowHistory,
  BorrowStatus,
  CloseButton,
} from "./Components";

const Mobile = ({
  games,
  handleGameDeletion,
  gameDetails,
  history,
  setGameDetails,
  handleGameSet,
  getCellColor,
  capitalize,
}: {
  games: AdminGame[];
  handleGameDeletion: (id: number) => Promise<void>;
  gameDetails: AdminGame | null;
  history: HistoryItem[];
  setGameDetails: React.Dispatch<React.SetStateAction<AdminGame | null>>;
  handleGameSet: (newGame: AdminGame) => void;
  getCellColor: (
    status: BorrowStatusesType,
  ) => "bg-darkGreenV text-offWhiteV" | "bg-orangeV" | "bg-pinkV";
  capitalize: (word: string) => string;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <button
        className="btn-primary ml-auto"
        onClick={() => router.push("/admin/add-game")}
      >
        Add game
      </button>
      {games.map((game) => {
        const currentGame = gameDetails === game;

        return (
          <div
            key={game.gameId}
            className="box-basic"
          >
            <div>
              <div>
                <div>
                  <div className="flex justify-between">
                    <h2
                      className="text-long-name w-full"
                      onClick={() => handleGameSet(game)}
                    >
                      {game.gameName}
                    </h2>
                    {!currentGame && (
                      <div className="hidden w-full sm:block">
                        <BorrowStatus
                          game={game}
                          capitalize={capitalize}
                          getCellColor={getCellColor}
                        />
                      </div>
                    )}
                    {currentGame && (
                      <>
                        <CloseButton setGameDetails={setGameDetails} />
                      </>
                    )}
                  </div>

                  {currentGame && (
                    <div className="gap-4 sm:flex">
                      <div
                        className="relative mb-2 aspect-[1/1] sm:w-1/2"
                        onClick={() => setGameDetails(null)}
                      >
                        <Image
                          src={game.imageUrl || "/fallbackGame.png"}
                          alt={game.gameName}
                          fill
                          sizes="300px"
                          className="object-cover"
                        />
                      </div>

                      {currentGame && (
                        <div className="hidden sm:block">
                          <BorrowerInfo game={game} />
                          <div className="sm:hidden">
                            <BorrowHistory history={history} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {currentGame && (
                <div className="hidden sm:flex sm:w-1/2 sm:flex-col sm:gap-2">
                  <div>
                    <BorrowStatus
                      game={game}
                      capitalize={capitalize}
                      getCellColor={getCellColor}
                    />
                  </div>
                  <BorrowHistory history={history} />
                </div>
              )}

              <div className="sm:hidden">
                <BorrowStatus
                  game={game}
                  capitalize={capitalize}
                  getCellColor={getCellColor}
                />
              </div>
            </div>

            {currentGame && (
              <div className="sm:hidden">
                <BorrowerInfo game={game} />
                <BorrowHistory history={history} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Mobile;
