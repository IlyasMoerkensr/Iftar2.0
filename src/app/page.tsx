"use client";

import CountdownTimer from "@/components/CountdownTimer";
import Decorations from "@/components/Decorations";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationData, setLocationData] = useState<{
    city: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
  } | null>(null);
  const [iftarTime, setIftarTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Stap 1: Verkrijg de locatie van de gebruiker op basis van IP
        const locationResponse = await axios.get("/api/location");
        const location = locationResponse.data;
        
        // Update de staat met locatiegegevens
        setLocationData(location);

        // Stap 2: Verkrijg gebedstijden op basis van locatie
        const prayerResponse = await axios.get("/api/prayer-times", {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        });

        // Maghrib tijd is de Iftar tijd
        const maghribTime = prayerResponse.data.maghrib;
        setIftarTime(maghribTime);

        setLoading(false);
      } catch (err) {
        console.error("Fout bij het ophalen van gegevens:", err);
        setError("Kon de Iftar-tijd niet laden. Probeer het later opnieuw.");
        setLoading(false);
      }
    };

    // Haal de gegevens op
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-4 relative">
      {/* Decoratieve elementen */}
      <Decorations />

      {/* Hoofdinhoud */}
      <div className="z-10 max-w-4xl w-full mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          Iftar Afteltimer
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin h-16 w-16 border-4 border-primary rounded-full border-t-transparent"></div>
            <p className="mt-6 text-xl">
              We zijn je locatie aan het bepalen en berekenen van de Iftar-tijd...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 p-6 rounded-lg text-center">
            <p className="text-xl text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition-all"
            >
              Probeer opnieuw
            </button>
          </div>
        ) : (
          locationData &&
          iftarTime && (
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-800">
              <CountdownTimer
                iftarTime={iftarTime}
                city={locationData.city}
                country={locationData.country}
              />
            </div>
          )
        )}

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>Vergeet niet om dua te doen voordat je je vasten verbreekt.</p>
          <p className="mt-2">
            اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ
            تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ
          </p>
          <p className="mt-1 text-xs">
            &quot;O Allah, ik heb gevast voor U, ik geloof in U, ik stel mijn
            vertrouwen op U en ik verbreek mijn vasten met Uw voorziening.&quot;
          </p>
        </footer>
      </div>
    </div>
  );
}
