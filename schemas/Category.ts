import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Måste ange namn på kategori"),
});

type Formdata = z.infer<typeof schema>;

export function validateCategory(body: Formdata) {
  return schema.safeParse(body);
}
