import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //validação de dados
import zod, { z } from "zod"; //validação de dados
import { prisma } from "../lib/prisma";
import dayjs from "dayjs"; //manipulaçao de datas

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;

      const { destination, ends_at, starts_at } = request.body;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      });

      if (!trip) {
        throw new Error("Trip not found");
      }

      if (dayjs(starts_at).isBefore(new Date())) {
        return new Error("invalid trip start date.");
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        return new Error("invalid trip end date.");
      }

      await prisma.trip.update({
        where: {
          id: tripId,
        },
        data: {
          destination: destination,
          starts_at: starts_at,
          ends_at: ends_at,
        },
      });

      return { tripId: trip.id };
    }
  );
}
