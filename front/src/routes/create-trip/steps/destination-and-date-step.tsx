import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  closeGuestInput: () => void;
  openGuestInput: () => void;
}

function DestinationAndDateStep(props: DestinationAndDateStepProps) {
  return (
    <>
      <div className="p-4 bg-zinc-900 rounded-xl flex items-center w-full shadow-shape gap-3">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <input
            disabled={props.isGuestInputOpen}
            type="text"
            placeholder="Para onde você vai?"
            className="bg-transparent text-lg placeholder:text-zinc-400 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <input
            disabled={props.isGuestInputOpen}
            type="text"
            placeholder="Quando?"
            className="bg-transparent placeholder:text-lg placeholder:text-zinc-400 outline-none w-32"
          />
        </div>
        <div className="w-[2px] h-6 bg-zinc-800"></div>
        {props.isGuestInputOpen ? (
          <button
            onClick={props.closeGuestInput}
            className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
          >
            Alterar local/data
            <Settings2 className="size-5 text-zinc-200" />
          </button>
        ) : (
          <button
            onClick={props.openGuestInput}
            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
          >
            Continuar
            <ArrowRight className="size-5 text-lime-950" />
          </button>
        )}
      </div>
    </>
  );
}
export default DestinationAndDateStep;
