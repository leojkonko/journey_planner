import { AtSign, User, X } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
  closeConfirmedModalTrip: () => void;
  // addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

function ConfirmTripModal(props: ConfirmTripModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Confirmar criação da viagem</h2>
              <button onClick={props.closeConfirmedModalTrip}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Você foi convidado(a) para participar de uma viagem para
              <span className="font-semibold text-zinc-100">
                {" "}
                Florianópolis
              </span>
              , Brasil nas datas de{" "}
              <span className="font-semibold text-zinc-100">
                16 a 27 de Agosto de 2024
              </span>
              .
            </p>
            <p className="text-sm text-zinc-400 pt-4">
              Para confirmar sua presença na viagem, preencha os dados abaixo:
            </p>
          </div>

          <form
            onSubmit={props.createTrip}
            action=""
            className="flex flex-col w-100 gap-2"
          >
            <div className="flex gap-2 items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
              <User className="text-zinc-400 size-5 ms-2" />
              <input
                onChange={(event) => props.setOwnerEmail(event.target.value)}
                type="text"
                name="name"
                placeholder="Seu nome completo"
                className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none flex-1"
              />
            </div>
            <div className="flex gap-2 items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
              <AtSign className="text-zinc-400 size-5 ms-2" />
              <input
                onChange={(event) => props.setOwnerName(event.target.value)}
                type="email"
                name="email"
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
    </>
  );
}

export default ConfirmTripModal;
