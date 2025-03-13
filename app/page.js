"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [data, setData] = useState(null);
  const [meanError, setMeanError] = useState(null);

  useEffect(() => {
    // Fetch available countries
    fetch("/api/countries")
      .then((res) => res.json())
      .then(setCountries);

    // Fetch mean error
    fetch("/api/mean-error")
      .then((res) => res.json())
      .then((res) => setMeanError(res.mean_error));
  }, []);

  const handleSelect = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    const res = await fetch(`/api/predict/${country}`);
    const result = await res.json();
    setData(result);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-orange-600 p-8 rounded-2xl shadow-lg text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Olympic Medal Predictor 🏅
        </h1>

        <select
          onChange={handleSelect}
          value={selectedCountry}
          className="w-full p-3 bg-black text-orange-400 border-2 border-orange-500 rounded-lg focus:outline-none focus:border-orange-300 transition duration-300"
        >
          <option value="">-- Select a Country --</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        {data && (
          <div className="mt-6 bg-black p-6 rounded-lg shadow-lg border border-orange-500">
            <h2 className="text-xl font-semibold text-orange-400">
              {selectedCountry}
            </h2>
            <p className="mt-2">
              <strong className="text-orange-300">Actual Medals:</strong>{" "}
              {data.actual_medals}
            </p>
            <p>
              <strong className="text-orange-300">Predicted Medals:</strong>{" "}
              {data.predicted_medals}
            </p>
            <p>
              <strong className="text-orange-300">Error:</strong> {data.error}
            </p>
          </div>
        )}

        {meanError !== null && (
          <p className="mt-4 text-sm text-orange-200">
            <strong>Mean Error: </strong> {meanError}
          </p>
        )}
      </div>
    </div>
  );
}
