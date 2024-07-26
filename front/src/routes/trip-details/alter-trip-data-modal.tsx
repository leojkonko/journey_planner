import { Modal } from "flowbite-react";
import { Link2Icon, MapPin, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface AlterTripDataModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

function AlterTripDataModal(props: AlterTripDataModalProps) {
  const [destination, setDestination] = useState<string>();
  const { tripId } = useParams();

  async function updateTrip(event: React.FormEvent) {
    event.preventDefault();

    if (!destination) {
      console.log("caiu no return destino");
      return;
    }

    if (
      !props.eventStartAndEndDates?.from ||
      !props.eventStartAndEndDates?.to
    ) {
      console.log("caiu no return data");
      return;
    }

    await api.put(`/trips/${tripId}`, {
      destination: destination,
      starts_at: props.eventStartAndEndDates.from,
      ends_at: props.eventStartAndEndDates.to,
    });
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
              onSubmit={updateTrip}
              action=""
              className="flex flex-col w-100 gap-2"
            >
              <div className="flex gap-2 items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                <MapPin className="text-zinc-400 size-5 ms-2" />
                <input
                  onChange={(event) => setDestination(event.target.value)}
                  type="text"
                  name="destination"
                  placeholder="Destino"
                  className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none flex-1"
                />
              </div>
              <div className="flex gap-2 items-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Link2Icon className="text-zinc-400 size-5 ms-2" />
                <DayPicker
                  mode="range"
                  selected={props.eventStartAndEndDates}
                  onSelect={props.setEventStartAndEndDates}
                />
              </div>
              <button
                type="submit"
                // onClick={createTrip}
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

export default AlterTripDataModal;
