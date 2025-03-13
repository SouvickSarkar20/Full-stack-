import { getMeanError } from "@/app/lib/model";

export async function GET(){
    return Response.json({mean_error : getMeanError()});
}