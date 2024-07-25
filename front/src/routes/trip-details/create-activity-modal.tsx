import { Modal } from "flowbite-react";
import { Calendar, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface createActivityModalProps {
  createActivity: boolean;
  setCreateActivity: React.Dispatch<React.SetStateAction<boolean>>;
}

function createActivityModal(props: createActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title: title,
      accurs_at: occurs_at,
    });
    window.document.location.reload();
  }

  return (
    <>
      <Modal
        show={props.createActivity}
        onClose={() => props.setCreateActivity(false)}
      >
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Cadastrar atividade</h2>
                <button
                  onClick={() => props.setCreateActivity(false)}
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
                onSubmit={createActivity}
                className="p-2.5  flex flex-col items-center gap-2 w-full"
              >
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center px-4 py-1 w-full">
                  <Tag className="text-zinc-400 size-5" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Qual a atividade?"
                    className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none w-full"
                  />
                </div>
                <div className="flex w-full">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center px-4 py-1 w-full">
                    <Calendar className="text-zinc-400 size-5" />
                    <input
                      type="datetime-local"
                      name="occurs_at"
                      placeholder="20 de Agosto"
                      className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none [color-scheme:dark] w-full"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 w-full justify-center hover:bg-lime-400"
                >
                  Salvar atividade
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default createActivityModal;
