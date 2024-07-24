import { Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAndDateHeaderProps {}

function DestinationAndDateHeader(props: DestinationAndDateHeaderProps) {
  return (
    <>
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
    </>
  );
}

export default DestinationAndDateHeader;
