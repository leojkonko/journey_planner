import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus,
} from "lucide-react";
import { FormEvent, useState } from "react";

function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(["opa@gmail.com"]);

  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-900 rounded-xl flex items-center w-full shadow-shape gap-3">
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                  disabled={isGuestInputOpen}
                  type="text"
                  placeholder="Para onde você vai?"
                  className="bg-transparent text-lg placeholder:text-zinc-400 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input
                  disabled={isGuestInputOpen}
                  type="text"
                  placeholder="Quando?"
                  className="bg-transparent placeholder:text-lg placeholder:text-zinc-400 outline-none w-32"
                />
              </div>
              <div className="w-[2px] h-6 bg-zinc-800"></div>
              {isGuestInputOpen ? (
                <button
                  onClick={closeGuestInput}
                  className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
                >
                  Alterar local/data
                  <Settings2 className="size-5 text-zinc-200" />
                </button>
              ) : (
                <button
                  onClick={openGuestInput}
                  className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                >
                  Continuar
                  <ArrowRight className="size-5 text-lime-950" />
                </button>
              )}
            </div>
            {isGuestInputOpen && (
              <div className="p-4 bg-zinc-900 rounded-xl flex items-center w-full shadow-shape gap-3">
                <button
                  type="button"
                  onClick={openGuestModal}
                  className="flex items-center gap-2 flex-1"
                >
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  <span className="text-zinc-400 text-lg flex-1 text-start">
                    Quem estará na viagem?
                  </span>
                  {/* <input
                    type="text"
                    placeholder="Quem estará na viagem?"
                    className="bg-transparent text-lg placeholder:text-zinc-400 outline-none"
                  /> */}
                </button>
                <div className="w-[2px] h-6 bg-zinc-800"></div>
                <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Confirmar viagem
                  <ArrowRight className="size-5 text-lime-950" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda
            <br />
            com nossos
            <a href="" className="text-zinc-300 underline">
              termos de uso
            </a>
            e
            <a href="" className="text-zinc-300 underline">
              políticas de privacidade.
            </a>
          </p>
        </div>
        {isGuestModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Selecionar convidados:</h2>
                  <button onClick={closeGuestModal}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
                <p className="text-sm text-zinc-400">
                  Os convidados irão receber e-mails para confirmar a
                  participação na viagem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                {emailsToInvite.map((email) => {
                  return (
                    <div
                      key={email}
                      className="bg-zinc-700 py-1.5 px-2.5 rounded-md flex items-center gap-2 text-zinc-300"
                    >
                      {email}
                      <button onClick={() => removeEmailFromInvites(email)}>
                        <X className="size-4 text-zinc-300" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="w-full h-px bg-zinc-800"></div>

              <form
                onSubmit={addNewEmailToInvite}
                action=""
                className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
              >
                <AtSign className="text-zinc-400 size-5 ms-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o email do convidado"
                  className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
                />
                <button
                  type="submit"
                  className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                >
                  Confirmar viagem
                  <Plus className="size-5 text-lime-950" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
