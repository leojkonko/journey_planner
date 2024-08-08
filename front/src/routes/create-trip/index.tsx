import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InviteGuestsModal from "./invite-guests-modal";
import ConfirmTripModal from "./confirm-trip-modal";
import DestinationAndDateStep from "./steps/destination-and-date-step";
import InviteGuestsStep from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import Trips from "./trips";

function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(["opa@gmail.com"]);
  const [isConfirmedModalTripOpen, setConfirmedModalTripOpen] = useState(false);

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

  function openConfirmedModalTrip() {
    setConfirmedModalTripOpen(true);
  }

  function closeConfirmedModalTrip() {
    setConfirmedModalTripOpen(false);
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

  //envio de dados para api
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      console.log("caiu no return");
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      console.log("caiu no return");
      return;
    }

    if (emailsToInvite.length == 0) {
      console.log("caiu no return");
      return;
    }

    if (!ownerName || !ownerEmail) {
      console.log("caiu no return");
      return;
    }

    const response = await api.post("/trips", {
      destination: destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      owner_name: ownerName,
      owner_email: ownerEmail,
      emails_to_invite: emailsToInvite,
    });

    const { tripId } = response.data;
    console.log(response.data);
    console.log(tripId);
    navigate(`/trips/${tripId}`);
  }

  return (
    <>
      <div className="h-max py-40 flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <DestinationAndDateStep
              closeGuestInput={closeGuestInput}
              isGuestInputOpen={isGuestInputOpen}
              openGuestInput={openGuestInput}
              setDestination={setDestination}
              eventStartAndEndDates={eventStartAndEndDates}
              setEventStartAndEndDates={setEventStartAndEndDates}
            />

            {isGuestInputOpen && (
              <InviteGuestsStep
                openConfirmedModalTrip={openConfirmedModalTrip}
                openGuestModal={openGuestModal}
                emailsToInvite={emailsToInvite}
              />
            )}
          </div>
          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda
            <br />
            com nossos{" "}
            <a href="" className="text-zinc-300 underline">
              termos de uso
            </a>{" "}
            e{" "}
            <a href="" className="text-zinc-300 underline">
              políticas de privacidade.
            </a>
          </p>
        </div>
        {isGuestModalOpen && (
          <InviteGuestsModal
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestModal={closeGuestModal}
            removeEmailFromInvites={removeEmailFromInvites}
            emailsToInvite={emailsToInvite}
          />
        )}
        {isConfirmedModalTripOpen && (
          <ConfirmTripModal
            closeConfirmedModalTrip={closeConfirmedModalTrip}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
          />
        )}
      </div>
      <Trips />
    </>
  );
}

export default CreateTripPage;
