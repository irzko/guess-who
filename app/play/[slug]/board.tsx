"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const Card = ({ character }: { character: Character }) => {
  const [isClose, setIsClose] = useState(false);
  return (
    <button
      onClick={() => setIsClose(!isClose)}
      className="border relative border-gray-200 shadow overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          className="object-cover"
          src={character.image}
          fill
          alt={character.name}
        />
      </div>
      <p className="text-center line-clamp-1 font-semibold py-1.5 md:py-2">
        {character.name}
      </p>
      {isClose && (
        <div className="bg-gray-100/90 text-gray-900 absolute flex justify-center items-center inset-0">
          <svg className="w-[48px] h-[48px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
        </div>
      )}
    </button>
  );
};

export default function Board({ data: characters }: { data: Character[] }) {
  const searchParams = useSearchParams();
  const characterSelectedId = searchParams.get("c");
  const characterSelected = characters.find(
    (character) => character.id === characterSelectedId,
  );

  if (!characterSelected) return null
  return (
    <>
      
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold py-4">Đã chọn</h2>
        <div className="relative aspect-[3/4] w-64">
          <Image
            className="object-cover rounded-2xl"
            src={characterSelected.image}
            fill
            alt={characterSelected.name}
          />
        </div>

        <h2 className="text-center text-3xl font-bold py-4">
          {characterSelected.name}
        </h2>
      </div>
      <div className="grid mt-16 grid-cols-3 md:grid-cols:6 gap-2">
        {characters
          .filter((i) => i.id !== characterSelectedId)
          .map((char) => {
            return <Card key={char.id} character={char} />;
          })}
      </div>
    </>
  );
}
