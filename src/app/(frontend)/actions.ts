"use server";

import config from "@payload-config";
import { revalidatePath } from "next/cache";
import { getPayload } from "payload";

export async function updateJulegave(id: number, formData: FormData) {
    if(!Number.isInteger(id)) {
        throw new Error("Ugyldig id");
    }

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

    const payload = await getPayload({ config });

    await payload.update({
        collection: "julegaver",
        id,
        data: {
            betegnelse: betegnelse.trim(),
            mottaker: mottaker.trim(),
        },
        overrideAccess: false,
    });

    revalidatePath("/");

}

export async function deleteJulegave(id: number) {
    if(!Number.isInteger(id)) {
        throw new Error("Ugyldig id");
    }

    const payload = await getPayload({ config });

    await payload.delete({
        collection: "julegaver",
        id,
        overrideAccess: false,
    });

    revalidatePath("/");

}

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