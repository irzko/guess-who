import { getGSheet } from "@/lib/getGSheet";
import { getRandomElements } from "@/lib/getRandomElements";
import Board from "./board";
import { unstable_cache } from "next/cache";
import BackButton from "@/components/BackButton";

//1Ls8wM7rnT4ND3lGh2GBIOmh0WjTYC4HU_reZ3rFeS7g/edit#gid=0
const getCharacters = unstable_cache(
  async (spreadsheetId: string) => {
    return (await getGSheet(spreadsheetId, "0")) as unknown as Character[];
  },
  ["characters"],
  { tags: ["characters"] },
);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  if (!slug) {
    return null;
  }
  const characters = await getCharacters(
    "1Ls8wM7rnT4ND3lGh2GBIOmh0WjTYC4HU_reZ3rFeS7g",
  );
  const charactersSelected = getRandomElements(characters, 25, slug);
  return (
    <main className="flex justify-center">
      <div className="max-w-screen-lg w-full p-2">
        <BackButton />
        <Board data={charactersSelected} />
      </div>
    </main>
  );
}
