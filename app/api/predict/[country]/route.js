import { predictMedals } from "@/app/lib/model";

export async function GET(req, context) {

    const params = await context.params;

    console.log("Received params :", params);
    console.log("Received country :", params.country);


    if (!params?.country) {
        return Response.json({ error: "Country parameter missing" }, { status: 400 });
    }
    const country = params.country;
    console.log("Executing Python script...");
    console.log("Sending data to Python script:", { country });

    const result = predictMedals(country);

    if (!result || Object.keys(result).length === 0) {
        return Response.json({ error: "Country not found" }, { status: 404 });
    }

    return Response.json(result);
}