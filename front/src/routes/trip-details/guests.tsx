import { CircleCheck, CircleDashed, UserCog } from "lucide-react";

interface GuestsProps {}

function Guests(props: GuestsProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="text-xl font-bold text-zinc-100">Convidados</div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-10/12 space-y-1.5">
            Jéssica white
            <span className="text-zinc-500 text-sm truncate">
              jessica.white44@yahoo.com
            </span>
          </div>
          <div className="w-2/12 flex justify-end">
            <CircleDashed className="size-5 text-zinc-100 shrink-0" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-10/12 space-y-1.5">
            Rita Pacocha
            <span className="text-zinc-500 text-sm truncate">
              lacy.stiedemann@gmail.com
            </span>
          </div>
          <div className="w-2/12 flex justify-end">
            <CircleCheck className="size-5 text-lime-300 shrink-0" />
          </div>
        </div>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 flex items-center px-4 py-3 rounded-lg gap-2 justify-center w-full">
          <UserCog className="size-5 text-zinc-100" />
          Confirmar atividades
        </button>
      </div>
    </>
  );
}

export default Guests;
