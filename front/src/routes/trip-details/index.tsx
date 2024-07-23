import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  MapPin,
  Plus,
  Settings2,
  UserCog,
} from "lucide-react";

function TripDetailsPage() {
  return (
    <>
      <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
        <div className="px-5 rounded-lg py-3 bg-zinc-900 shadow-shape flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <span className="text-zinc-100">Floripa</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-zinc-100">24/07/2024</span>
            </div>
            <button className="flex items-center gap-2 bg-zinc-800 px-4 py-3 rounded-lg hover:bg-zinc-700">
              <Settings2 className="size-5 text-zinc-200" />
              <span className="text-zinc-100">Alterar local/data</span>
            </button>
          </div>
        </div>
        <main className="flex flex-col lg:flex-nowrap gap-16 lg:flex-row pt-4 px-6">
          <div className="w-100 lg:w-8/12 space-y-8">
            <div className="flex justify-between">
              <h2 className="font-bold text-3xl">Atividades</h2>
              <button className="bg-lime-300 hover:bg-lime-400 text-zinc-950 flex items-center px-4 py-3 rounded-lg gap-2">
                <Plus className="size-5 text-zinc-950" />
                Confirmar atividades
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                  <span className="text-xl font-bold text-zinc-300">
                    Dia 17
                  </span>
                  <span className="text-xs text-zinc-500">Sábado</span>
                </div>
                <p className="text-zinc-500">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              </div>
              <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                  <span className="text-xl font-bold text-zinc-300">
                    Dia 18
                  </span>
                  <span className="text-xs text-zinc-500">Domingo</span>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl shadow-shape p-4 bg-zinc-900 flex items-center gap-3">
                    <div className="text-zinc-100 flex items-center gap-3">
                      <CircleCheck className="size-5 text-lime-300" />
                      Academia em grupo
                    </div>
                    <div className="text-sm text-zinc-400 ml-auto">08:00</div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl shadow-shape p-4 bg-zinc-900 flex items-center gap-3">
                    <div className="text-zinc-100 flex items-center gap-3">
                      <CircleCheck className="size-5 text-lime-300" />
                      Academia em grupo
                    </div>
                    <div className="text-sm text-zinc-400 ml-auto">08:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 lg:w-4/12 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-100">
                Links importantes
              </h2>

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
            <div className="w-full h-px bg-zinc-800"></div>
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
          </div>
        </main>
      </div>
    </>
  );
}

export default TripDetailsPage;
