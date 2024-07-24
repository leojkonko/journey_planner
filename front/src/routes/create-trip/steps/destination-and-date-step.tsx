import { Modal } from "flowbite-react";
import { ArrowRight, Calendar, MapPin, Settings2, Tag, X } from "lucide-react";
import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  closeGuestInput: () => void;
  openGuestInput: () => void;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

function DestinationAndDateStep(props: DestinationAndDateStepProps) {
  const [openModal, setOpenModal] = useState(false);

  const displayedDate =
    props.eventStartAndEndDates &&
    props.eventStartAndEndDates.from &&
    props.eventStartAndEndDates.to
      ? format(props.eventStartAndEndDates.from, "d 'de' LLL")
          .concat(" até ")
          .concat(format(props.eventStartAndEndDates.to, "d 'de' LLL"))
      : null;

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-max rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Selecione a data</h2>
                <button onClick={() => setOpenModal(false)} className="reste">
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <DayPicker
                mode="range"
                selected={props.eventStartAndEndDates}
                onSelect={props.setEventStartAndEndDates}
              />
            </div>
          </div>
        </div>
      </Modal>

      <div className="p-4 bg-zinc-900 rounded-xl flex items-center w-full shadow-shape gap-3">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <input
            onChange={(event) => props.setDestination(event.target.value)}
            disabled={props.isGuestInputOpen}
            type="text"
            placeholder="Para onde você vai?"
            className="bg-transparent text-lg placeholder:text-zinc-400 outline-none border-none"
          />
        </div>
        <button
          onClick={() => setOpenModal(true)}
          disabled={props.isGuestInputOpen}
          className="flex items-center gap-2 text-left w-[20rem]"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span className="bg-transparent text-lg text-zinc-400 outline-none w-32 flex-1">
            {displayedDate || "Quando?"}
          </span>
        </button>
        <div className="w-[2px] h-6 bg-zinc-800"></div>
        {props.isGuestInputOpen ? (
          <button
            onClick={props.closeGuestInput}
            className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
          >
            Alterar local/data
            <Settings2 className="size-5 text-zinc-200" />
          </button>
        ) : (
          <button
            onClick={props.openGuestInput}
            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
          >
            Continuar
            <ArrowRight className="size-5 text-lime-950" />
          </button>
        )}
      </div>
    </>
  );
}
export default DestinationAndDateStep;
