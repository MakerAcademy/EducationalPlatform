
import { defineSchema } from "@tinacms/cli";

export default defineSchema({
  collections: [
    {
      label: "Content",
      name: "Content",
      path: "content/",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: ""
        }
        {
          type: "string",
          label: "Content Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea"
          },
        },
      ],
    },
  ],
});
