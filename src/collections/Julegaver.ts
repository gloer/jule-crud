import { CollectionConfig } from "payload";

export const Julegaver: CollectionConfig = {
    slug: "julegaver",
    labels: {
        singular: "Julegave",
        plural: "Julegaver",
    },
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: "betegnelse",
            type: "text",
            label: "Hva er julegaven",
            required: true,
        },
    ],
};