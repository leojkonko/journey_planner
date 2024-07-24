import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Trip {
  destination: string;
  starts_at: string;
  ends_at: string;
  id: string;
  is_confirmed: boolean;
}

function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.starts_at, "d 'de' LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d 'de' LLL"))
    : null;

  return (
    <>
      <div className="px-5 rounded-lg py-3 bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{trip?.destination}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{displayedDate}</span>
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
