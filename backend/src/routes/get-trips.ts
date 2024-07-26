import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
import { ClientError } from "../errors/client-error";

export async function getTrips(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips",
    // {
    //   schema: {
    //     params: z.object({
    //       tripId: z.string().uuid(),
    //     }),
    //   },
    // },
    async (request) => {
      //   const { tripId } = request.params;

      const trip = await prisma.trip.findMany({});
      console.log(trip);
      if (!trip) {
        throw new ClientError("Trip not found");
      }

      return { trip };
    }
  );
}
