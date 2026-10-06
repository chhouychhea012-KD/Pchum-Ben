"use client";
import { useEffect, useMemo, useState } from "react";

export function calculateCountdown(targetDate: string, current = Date.now()) {
  const totalMilliseconds = Math.max(0, new Date(targetDate).getTime() - current);
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMilliseconds,
    isFinished: totalMilliseconds <= 0,
  };
}

export function useCountdown(targetDate?: string) {
  const [tick, setTick] = useState(() => Date.now());
  useEffect(() => { if (!targetDate) return; const timer=setInterval(()=>setTick(Date.now()),1000); return ()=>clearInterval(timer); }, [targetDate]);
  return useMemo(() => targetDate ? calculateCountdown(targetDate,tick) : calculateCountdown(new Date(0).toISOString(),tick), [targetDate,tick]);
}
