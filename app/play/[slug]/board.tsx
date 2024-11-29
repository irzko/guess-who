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
      <p className="text-center font-semibold py-1.5 md:py-2">
        {character.name}
      </p>
      {isClose && (
        <div className="bg-gray-100/90 text-gray-900 font-semibold absolute flex justify-center items-center inset-0">
          Loại
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

        <h2 className="text-center text-3xl font-bold py-1.5 md:py-2">
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
