import { getGSheet } from "@/lib/getGSheet";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import BackButton from "@/components/BackButton";

const getCharacters = unstable_cache(
  async (spreadsheetId: string) => {
    return (await getGSheet(spreadsheetId, "0")) as unknown as Character[];
  },
  ["characters"],
  { tags: ["characters"] },
);

export default async function PickCharacterPage() {
  const characters = await getCharacters(
    "1Ls8wM7rnT4ND3lGh2GBIOmh0WjTYC4HU_reZ3rFeS7g",
  );
  return (
    <div className="max-w-screen-lg w-full space-y-10 p-2">
      <BackButton />
      <div className="text-center">
        <h1 className="text-4xl font-bold">Tất cả nhân vật</h1>
      </div>
      <ul className="grid grid-cols-3 md:grid-cols:6 gap-2">
        {characters.map((character) => {
          return (
            <li
              key={character.id}
              className="w-full shadow-md overflow-hidden bg-white rounded-lg"
            >
              <div className="w-full hover:bg-gray-50">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    className="object-cover"
                    src={character.image}
                    fill
                    alt={character.name}
                  />
                </div>
                <p className="text-center text-black line-clamp-1 font-semibold py-1.5 md:py-2 px-2">
                  {character.name}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
