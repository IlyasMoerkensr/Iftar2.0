import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface CountdownTimerProps {
  iftarTime: string;
  city: string;
  country: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  iftarTime,
  city,
  country,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isIftar, setIsIftar] = useState(false);

  useEffect(() => {
    if (!iftarTime) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);

    const calculateTimeLeft = () => {
      const now = DateTime.now();

      const [hours, minutes] = iftarTime.split(":").map(Number);

      const iftarDateTime = now.set({
        hour: hours,
        minute: minutes,
        second: 0,
        millisecond: 0,
      });

      if (now > iftarDateTime) {
        setIsIftar(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const diff = iftarDateTime
        .diff(now, ["hours", "minutes", "seconds"])
        .toObject();

      return {
        hours: Math.floor(diff.hours || 0),
        minutes: Math.floor(diff.minutes || 0),
        seconds: Math.floor(diff.seconds || 0),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsIftar(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [iftarTime]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary rounded-full border-t-transparent"></div>
        <p className="mt-4 text-lg">Iftar-tijd wordt geladen...</p>
      </div>
    );
  }

  if (isIftar) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <h2 className="text-4xl font-bold text-primary animate-pulse">
          Het is tijd voor Iftar!
        </h2>
        <p className="mt-4 text-xl">
          Geniet van je maaltijd en moge Allah je vasten accepteren.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl md:text-3xl mb-6 text-center">
        Tijd tot Iftar in{" "}
        <span className="text-accent">
          {city && country ? `${city}, ${country}` : "Locatie niet gevonden"}
        </span>
      </h2>

      <div className="flex gap-4 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 rounded-lg p-4 w-20 h-24 md:w-28 md:h-32 flex items-center justify-center animate-float">
            <span className="text-4xl md:text-5xl font-bold text-primary">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-sm md:text-base text-muted">UUR</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-800 rounded-lg p-4 w-20 h-24 md:w-28 md:h-32 flex items-center justify-center animate-pulse">
            <span className="text-4xl md:text-5xl font-bold text-secondary">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-sm md:text-base text-muted">MINUTEN</span>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="bg-gray-800 rounded-lg p-4 w-20 h-24 md:w-28 md:h-32 flex items-center justify-center animate-pulse"
            style={{ animationDuration: "1s" }}
          >
            <span className="text-4xl md:text-5xl font-bold text-accent">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-sm md:text-base text-muted">SECONDEN</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
