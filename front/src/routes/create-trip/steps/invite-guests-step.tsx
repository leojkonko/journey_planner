import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestsStepProps {
  openConfirmedModalTrip: () => void;
  openGuestModal: () => void;
  emailsToInvite: string[];
}

function InviteGuestsStep({
  openConfirmedModalTrip,
  openGuestModal,
  emailsToInvite,
}: InviteGuestsStepProps) {
  return (
    <>
      <div className="p-4 bg-zinc-900 rounded-xl flex items-center w-full shadow-shape gap-3">
        <button
          type="button"
          onClick={openGuestModal}
          className="flex items-center gap-2 flex-1"
        >
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-lg flex-1 text-start">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span className="text-zinc-400 text-lg flex-1 text-start">
              Quem estará na viagem?
            </span>
          )}
        </button>
        <div className="w-[2px] h-6 bg-zinc-800"></div>
        <button
          onClick={openConfirmedModalTrip}
          className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
        >
          Confirmar viagem
          <ArrowRight className="size-5 text-lime-950" />
        </button>
      </div>
    </>
  );
}

export default InviteGuestsStep;
