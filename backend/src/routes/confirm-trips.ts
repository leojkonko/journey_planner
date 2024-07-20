import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //validação de dados
import zod, { z } from "zod" //validação de dados


export async function confirmTrip(app: FastifyInstance) {
app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripid/confirm', {
    schema: {
        params: z.object({
            tripId: z.string().uuid(),
        })
    }
}, async (request) => {

    return {tripId: request.params.tripId}
})
} 