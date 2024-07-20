import fastify from "fastify";
import { createTrip } from "./routes/create-trips";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import { confirmTrip } from "./routes/confirm-trips";

const app = fastify();

app.register(cors, {
  origin: "*", // endereço do front p acessar back
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);

app.listen({ port: 3333 }).then(() => {
  console.log("opaaa");
});
