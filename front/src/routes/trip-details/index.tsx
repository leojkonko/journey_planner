import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  MapPin,
  Plus,
  Settings2,
  UserCog,
} from "lucide-react";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import CreateActivityModal from "./create-activity-modal";
import ImportantLinks from "./important-links";
import Guests from "./guests";
import DestinationAndDateHeader from "./destination-and-date-header";
import Activities from "./activities";

function TripDetailsPage() {
  const [createActivity, setCreateActivity] = useState(false);
  return (
    <>
      <CreateActivityModal
        createActivity={createActivity}
        setCreateActivity={setCreateActivity}
      />

      <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
        <a href="/" className="flex justify-center">
          <img src="/logo.svg" alt="plann.er" />
        </a>
        <DestinationAndDateHeader />
        <main className="flex flex-col lg:flex-nowrap gap-16 lg:flex-row pt-4 px-6">
          <div className="w-100 lg:w-8/12 space-y-8">
            <div className="flex justify-between">
              <h2 className="font-bold text-3xl">Atividades</h2>
              <button
                onClick={() => setCreateActivity(true)}
                className="bg-lime-300 hover:bg-lime-400 text-zinc-950 flex items-center px-4 py-3 rounded-lg gap-2"
              >
                <Plus className="size-5 text-zinc-950" />
                Cadastrar atividades
              </button>
            </div>
            <div className="space-y-6">
              <Activities />
            </div>
          </div>
          <div className="w-100 lg:w-4/12 space-y-6">
            <ImportantLinks />
            <div className="w-full h-px bg-zinc-800"></div>
            <Guests />
          </div>
        </main>
      </div>
    </>
  );
}

export default TripDetailsPage;
