"use server";

import config from "@payload-config";
import { revalidatePath } from "next/cache";
import { getPayload } from "payload";

export async function readJulegaver() {
    const payload = await getPayload({ config });

    const queryResult = await payload.find({
        collection: "julegaver",
        sort: "-createdAt",
        limit: 100,        
        overrideAccess: false,
    });

    return queryResult.docs;
}

export async function createJulegave(formData: FormData) {
    const betegnelse = formData.get("betegnelse");
    const mottaker = formData.get("mottaker");

    if (
        typeof betegnelse !== "string" ||
        typeof mottaker !== "string" ||
        !betegnelse.trim() ||
        !mottaker.trim()
    ) {
        throw new Error("Feil i inndata");
    }

    const payload = await getPayload( {config} );

    await payload.create({
        collection: "julegaver",
        data: {
            betegnelse: betegnelse.trim(),
            mottaker: mottaker.trim(),
        },
        overrideAccess: false,
    });

    revalidatePath("/");

}