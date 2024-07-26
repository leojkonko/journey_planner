import { Modal } from "flowbite-react";
import { AtSign, Link2, Plus, User, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import CreateLinkModal from "./create-link-modal";
interface Links {
  id: string;
  title: string;
  url: string;
  trip_id: string;
}
function ImportantLinks() {
  const [openModal, setOpenModal] = useState(false);
  const { tripId } = useParams();
  const [links, setLinks] = useState<Links[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100">Links importantes</h2>

        {links.map((link) => {
          return (
            <div key={link.id} className="flex items-center justify-between">
              <div className="flex flex-col w-10/12 space-y-1.5">
                {link.title}
                <a
                  href=""
                  className="text-zinc-500 text-sm truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <div className="w-2/12 flex justify-end">
                <Link2 className="size-5 text-zinc-100 shrink-0" />
              </div>
            </div>
          );
        })}

        <button
          onClick={() => setOpenModal(true)}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 flex items-center px-4 py-3 rounded-lg gap-2 justify-center w-full"
        >
          <Plus className="size-5 text-zinc-100" />
          Criar link
        </button>
      </div>
      <CreateLinkModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default ImportantLinks;
