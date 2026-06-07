import { z } from "zod";

const schema = z
  .object({
    type: z.string().min(1, { message: "Måste ange typ" }),
  })
  .and(
    z.discriminatedUnion("type", [
      z.object({
        title: z.string().min(1, { message: "Måste ange titel" }),
        categoryId: z.object({
          category: z.string().min(1, { message: "Måste ange typ" }),
        }),
        type: z.literal("Bok", { message: "Måste ange typ" }),
        author: z.string().min(1, { message: "Måste ange författare" }),
        nbrPages: z
          .number({ error: "Måste vara en siffra" })
          .min(1, { message: "Måste ange antal sidor" }),
      }),
      z.object({
        title: z.string().min(1, { message: "Måste ange titel" }),
        categoryId: z.object({
          category: z.string().min(1, { message: "Måste ange typ" }),
        }),
        type: z.literal("Uppslagsbok", { message: "Måste ange typ" }),
        author: z.string().min(1, { message: "Måste ange författare" }),
        nbrPages: z
          .number({ error: "Måste vara en siffra" })
          .min(1, { message: "Måste ange antal sidor" }),
      }),
      z.object({
        title: z.string().min(1, { message: "Måste ange titel" }),
        categoryId: z.object({
          category: z.string().min(1, { message: "Måste ange typ" }),
        }),
        type: z.literal("Dvd", { message: "Måste ange typ" }),
        runTimeMinutes: z
          .number({ error: "Måste vara en siffra" })
          .min(1, { message: "Måste ange antal sidor" }),
      }),
      z.object({
        title: z.string().min(1, { message: "Måste ange titel" }),
        categoryId: z.object({
          category: z.string().min(1, { message: "Måste ange typ" }),
        }),
        type: z.literal("Ljudbok", { message: "Måste ange typ" }),
        runTimeMinutes: z
          .number({ error: "Måste vara en siffra" })
          .min(1, { message: "Måste ange antal sidor" }),
      }),
    ]),
  );

type Formdata = z.infer<typeof schema>;

export function validateArticle(body: Formdata) {
  return schema.safeParse(body);
}
