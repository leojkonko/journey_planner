import { Modal } from "flowbite-react";
import { Calendar, Link2, Plus, Tag, X } from "lucide-react";

interface ImportantLinksProps {}

function ImportantLinks(props: ImportantLinksProps) {
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100">Links importantes</h2>

        <div className="flex items-center justify-between">
          <div className="flex flex-col w-10/12 space-y-1.5">
            Reserva do AirBnB
            <a
              href=""
              className="text-zinc-500 text-sm truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <div className="w-2/12 flex justify-end">
            <Link2 className="size-5 text-zinc-100 shrink-0" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-10/12 space-y-1.5">
            Reserva do AirBnB
            <a
              href=""
              className="text-zinc-500 text-sm truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <div className="w-2/12 flex justify-end">
            <Link2 className="size-5 text-zinc-100 shrink-0" />
          </div>
        </div>

        <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 flex items-center px-4 py-3 rounded-lg gap-2 justify-center w-full">
          <Plus className="size-5 text-zinc-100" />
          Confirmar atividades
        </button>
      </div>
    </>
  );
}

export default ImportantLinks;
