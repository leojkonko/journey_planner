import { Modal } from "flowbite-react";
import { AtSign, User, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
}

function CreateLinkModal(props: CreateLinkModalProps) {
  const [title, setTitle] = useState<string>();
  const [url, setUrl] = useState<string>();
  const { tripId } = useParams();

  async function createLink(event: React.FormEvent) {
    event.preventDefault();

    await api.post(`/trips/${tripId}/links`, {
      title: title,
      url: url,
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
                <h2 className="text-lg font-bold">
                  Criar links importantes para a viagem
                </h2>
                <button onClick={() => props.setOpenModal(false)}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <form
              onSubmit={createLink}
              action=""
              className="flex flex-col w-100 gap-2"
            >
              <div className="flex gap-2 items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                <User className="text-zinc-400 size-5 ms-2" />
                <input
                  onChange={(event) => setTitle(event.target.value)}
                  type="text"
                  name="title"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none flex-1"
                />
              </div>
              <div className="flex gap-2 items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                <AtSign className="text-zinc-400 size-5 ms-2" />
                <input
                  onChange={(event) => setUrl(event.target.value)}
                  type="url"
                  name="url"
                  placeholder="Seu email pessoal"
                  className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none flex-1"
                />
              </div>
              <button
                type="submit"
                // onClick={props.createTrip}
                className="bg-lime-300 text-lime-950 rounded-lg px-6 py-3 mt-1   justify-center font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Confirmar minha presença
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateLinkModal;
