import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
//this is a synchronous way to run commands or apis that are part of some other script or language 
import Papa from "papaparse";
//used to parse data from csv files to js objects and vice-versa 

// Fixing the path issue
const csvFilePath = path.resolve("app/lib/teams.csv");

// Debugging path
console.log("Resolved CSV Path:", csvFilePath);

if (!fs.existsSync(csvFilePath)) {
    throw new Error(`File not found: ${csvFilePath}`);
}

const csvData = fs.readFileSync(csvFilePath, "utf-8");

//read the data of this file
const { data } = Papa.parse(csvData, { header: true });
//parse the data into js object

const meanError = data.reduce((sum, row) => sum + Math.abs(row.medals - row.predictions), 0) / data.length;

//get the list of the countries here 
export function getCountries() {
    return data.map(row => row.team); //
}

//get the actual and predicted medal data from the medal
export function getMedalData(team) {
    const row = data.find(row => row.team == team);
    if (!row) return null;

    return {
        actual_medals: parseInt(row.medals),
        predicted_medals: parseInt(row.predictions),
        error: Math.abs(row.medals - row.predictions),
    }
}

//call the python model for prediction
export function predictMedals(team) {
    const pythonScript = path.join(process.cwd(), "app/lib/run_model.py");
    console.log("executing :", pythonScript);

    const pythonCommand = process.platform === "win32" ? "python" : "python3";
    const result = spawnSync(pythonCommand, [pythonScript, team], { encoding: "utf-8" });


    //debugging
    console.log("STDOUT :", result.stdout);
    console.log("STDERR :", result.stderr);
    console.log("EXIT CODE :", result.status);




    // Handle errors
    if (!result.stdout.trim()) {
        throw new Error("Python script returned empty response.");
    }

    try {
        return JSON.parse(result.stdout);
    } catch (error) {
        throw new Error("Invalid JSON from Python script: " + result.stdout);
    }
}
//get the mean error for model performance 
export function getMeanError() {
    return meanError;
}