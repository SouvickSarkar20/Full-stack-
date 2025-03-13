import { getCountries } from "@/app/lib/model";

export async function GET() {

    return Response.json(getCountries());
    
}