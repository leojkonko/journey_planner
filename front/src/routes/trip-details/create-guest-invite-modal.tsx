import {
  Calendar,
  CheckCircle,
  CheckCircle2,
  CircleCheck,
  CircleDashed,
  Tag,
  User,
  UserCog,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Modal } from "flowbite-react";

interface InviteGuestModal {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
}

function InviteGuestModal(props: InviteGuestModal) {
  const [participant, setParticipant] = useState<string>();
  const { tripId } = useParams();

  async function inviteGuest(event: React.FormEvent) {
    event.preventDefault();
    await api.post(`/trips/${tripId}/invites`, {
      email: participant,
    });
    () => props.setOpenModal(false);
    window.document.location.reload();
  }

  return (
    <>
      <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Convidar participante</h2>
                <button
                  onClick={() => props.setOpenModal(false)}
                  className="reste"
                >
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400 text-start">
                Todos convidados podem visualizar as atividades.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center w-full">
              <form
                onSubmit={inviteGuest}
                className="p-2.5  flex flex-col items-center gap-2 w-full"
              >
                <div className="flex w-full">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center px-4 py-1 w-full">
                    <User className="text-zinc-400 size-5" />
                    <input
                      onChange={(event) => setParticipant(event.target.value)}
                      type="email"
                      name="email"
                      placeholder="Email do participante"
                      className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none [color-scheme:dark] w-full"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 w-full justify-center hover:bg-lime-400"
                >
                  Enviar convite
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default InviteGuestModal;
