import {
  CheckCircle,
  CheckCircle2,
  CircleCheck,
  CircleDashed,
  UserCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import InviteGuestModal from "./create-guest-invite-modal";

interface Guests {
  name: string | null;
  email: string;
  id: string;
  is_confirmed: boolean;
}

function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Guests[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);
  return (
    <>
      <div className="space-y-4">
        <div className="text-xl font-bold text-zinc-100">Convidados</div>
        {participants?.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between"
            >
              <div className="flex flex-col w-10/12 space-y-1.5">
                {participant.name ?? `Convidado ${index}`}
                <span className="text-zinc-500 text-sm truncate">
                  {participant.email}
                </span>
              </div>
              <div className="w-2/12 flex justify-end">
                {participant.is_confirmed ? (
                  <CheckCircle2 className="size-5 text-lime-300 shrink-0" />
                ) : (
                  <CircleDashed className="size-5 text-zinc-100 shrink-0" />
                )}
              </div>
            </div>
          );
        })}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 flex items-center px-4 py-3 rounded-lg gap-2 justify-center w-full"
        >
          <UserCog className="size-5 text-zinc-100" />
          Convidar participante
        </button>
      </div>
      <InviteGuestModal setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
}

export default Guests;
