import axios from "axios";
import { NextResponse } from "next/server";

// Definieer de interface voor de verwachte structuur van de locatiegegevens
interface LocationData {
  location: {
    lat: number;
    lng: number;
  };
  ip: string;
  country: string;
  city: string;
}

export async function GET() {
  try {
    // Nieuwe API endpoint
    const apiKey = "at_d6nnoCtqATQiVCuifcog4705hjO3l"; // Zorg ervoor dat je de juiste API-sleutel gebruikt
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

    // Haal gegevens op van de nieuwe API en typ de response
    const ipResponse = await axios.get<LocationData>(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    // Verkrijg de gegevens van de API
    const { location, ip, country, city } = ipResponse.data;

    // Verkrijg de latitude en longitude uit de location object
    const { lat, lng } = location;

    // Geef de locatiegegevens terug als JSON
    return NextResponse.json({
      city,
      country,
      latitude: lat,
      longitude: lng,
      ip,
    });
  } catch (error) {
    console.error("Fout bij het ophalen van locatie:", error);
    return NextResponse.json(
      { error: "Fout bij het ophalen van locatiegegevens" },
      { status: 500 }
    );
  }
}
