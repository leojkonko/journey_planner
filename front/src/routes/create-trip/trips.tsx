import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CircleCheck } from "lucide-react";

interface Trip {
  destination: string;
  starts_at: string;
  ends_at: string;
  id: string;
  is_confirmed: boolean;
}

function Trips() {
  const { tripId } = useParams();
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    api
      .get(`/trips`)
      .then((response) => {
        if (
          response.data &&
          response.data.trip &&
          Array.isArray(response.data.trip)
        ) {
          setTrips(response.data.trip);
        } else {
          console.error("Formato de resposta inesperado:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar trips:", error);
      });
  }, [tripId]);

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-lg font-bold">Suas viagens:</h2>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip.id} className="space-y-2 mt-4">
              <Link to={`/trips/${trip.id}`} className="space-y-2.5">
                <div className="px-4 py-2.5 hover:bg-zinc-600 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck
                    className={`size-5 ${
                      trip.is_confirmed ? "text-lime-300" : "text-zinc-500"
                    }`}
                  />
                  <span className="text-zinc-100">{trip.destination}</span>
                  <span className="text-zinc-400 text-sm ml-auto">
                    {/* Formate a data de acordo com sua necessidade */}
                    {trip.starts_at}
                  </span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="mt-4 text-zinc-100">Sem viagens cadastradas</div>
        )}
      </div>
    </>
  );
}

export default Trips;
