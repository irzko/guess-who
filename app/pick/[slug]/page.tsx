import { getGSheet } from "@/lib/getGSheet";
import { getRandomElements } from "@/lib/getRandomElements";
import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import BackButton from "@/components/BackButton";

const getCharacters = unstable_cache(
  async (spreadsheetId: string) => {
    return (await getGSheet(spreadsheetId, "0")) as unknown as Character[];
  },
  ["characters"],
  { tags: ["characters"] },
);

export default async function PickCharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent((await params).slug);
  if (!slug) {
    return null;
  }
  const characters = await getCharacters(
    "1Ls8wM7rnT4ND3lGh2GBIOmh0WjTYC4HU_reZ3rFeS7g",
  );
  const charactersSelected = getRandomElements(characters, 25, slug);
  return (
    <main className="flex justify-center">
      <div className="max-w-screen-lg w-full space-y-10 p-2">
        <BackButton />
        <div className="text-center">
          <h1 className="text-4xl font-bold">Chọn một nhân vật</h1>
          <p className="text-gray-500 font-semibold">Hạt giống: {Buffer.from(slug, 'base64').toString("utf8")}</p>
        </div>
        <ul className="grid grid-cols-3 md:grid-cols:6 gap-2">
          {charactersSelected.map((character) => {
            return (
              <li
                key={character.id}
                className="w-full border border-gray-200 shadow overflow-hidden rounded-lg"
              >
                <Link
                  href={`/play/${slug}?c=${character.id}`}
                  className="w-full hover:bg-gray-50"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      className="object-cover"
                      src={character.image}
                      fill
                      alt={character.name}
                    />
                  </div>
                  <p className="text-center line-clamp-1 font-semibold py-1.5 md:py-2 px-2">
                    {character.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
