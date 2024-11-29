import { redirect } from "next/navigation";

export default function Home() {
  async function createSeed(formData: FormData) {
    "use server";
    const seed = formData.get("seed") as string;
    redirect("/pick/" + seed);
  }
  return (
    <main className="flex justify-center">
      <div className="max-w-screen-lg w-full p-2">
        <div className="min-h-screen flex flex-col items-center justify-center w-full">
          <form className="w-full space-y-4 max-w-xs" action={createSeed}>
            <input
              className="border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="seed"
              placeholder="Nhập hạt giống"
            />
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">Bắt đầu</button>
          </form>
        </div>
      </div>
    </main>
  );
}
