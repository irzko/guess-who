import { revalidateTag } from "next/cache";

export default function UpdatePage() {
  async function updateData() {
    "use server";
    revalidateTag("characters");
  }
  return (
    <main className="flex justify-center">
      <div className="max-w-screen-lg w-full p-2">
        <div className="min-h-screen flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl font-bold mb-16">Cập nhật dữ liệu</h1>
          <form
            className="w-full flex flex-col items-center gap-4 max-w-xs"
            action={updateData}
            autoComplete="off"
          >
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
