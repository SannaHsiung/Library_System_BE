import { z } from "zod";

const schema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("Bok", { message: "Måste ange typ" }),
    title: z.string().min(1, { message: "Måste ange titel" }),
    categoryId: z.object({
      id: z.string().min(1, { message: "Måste ange kategori" }),
    }),
    author: z.string().min(1, { message: "Måste ange författare" }),
    nbrPages: z
      .number({ message: "Måste vara en siffra" })
      .min(1, { message: "Måste ange antal sidor" }),
  }),
  z.object({
    type: z.literal("Uppslagsbok", { message: "Måste ange typ" }),
    title: z.string().min(1, { message: "Måste ange titel" }),
    categoryId: z.object({
      id: z.string().min(1, { message: "Måste ange kategori" }),
    }),
    author: z.string().min(1, { message: "Måste ange författare" }),
    nbrPages: z
      .number({ message: "Måste vara en siffra" })
      .min(1, { message: "Måste ange antal sidor" }),
  }),
  z.object({
    type: z.literal("Dvd", { message: "Måste ange typ" }),
    title: z.string().min(1, { message: "Måste ange titel" }),
    categoryId: z.object({
      id: z.string().min(1, { message: "Måste ange kategori" }),
    }),
    runTimeMinutes: z
      .number({ message: "Måste vara en siffra" })
      .min(1, { message: "Måste ange antal sidor" }),
  }),
  z.object({
    type: z.literal("Ljudbok", { message: "Måste ange typ" }),
    title: z.string().min(1, { message: "Måste ange titel" }),
    categoryId: z.object({
      id: z.string().min(1, { message: "Måste ange kategori" }),
    }),
    runTimeMinutes: z
      .number({ message: "Måste vara en siffra" })
      .min(1, { message: "Måste ange antal sidor" }),
  }),
]);

type Formdata = z.infer<typeof schema>;

export function validateArticle(body: Formdata) {
  return schema.safeParse(body);
}
