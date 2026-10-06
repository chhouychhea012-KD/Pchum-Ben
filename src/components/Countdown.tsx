"use client";
import { Box, Stack, Typography } from "@mui/material";
import { useCountdown } from "@/features/countdown/useCountdown";
import { useAppStore } from "@/stores/app-store";
import { toKhmerNumerals } from "@/lib/festival";
import { t } from "@/lib/i18n";

export default function Countdown({target}:{target:string}) { const c=useCountdown(target); const s=useAppStore((x)=>x.settings); const val=(n:number)=>s.locale==="km"&&s.khmerNumerals?toKhmerNumerals(String(n).padStart(2,"0")):String(n).padStart(2,"0"); const units=[[c.days,"days"],[c.hours,"hours"],[c.minutes,"minutes"],[c.seconds,"seconds"]] as const; return <Stack direction="row" spacing={{xs:.75,sm:1.5}} sx={{justifyContent:"center"}}>{units.map(([n,k])=><Box key={k} sx={{minWidth:{xs:64,sm:88},px:{xs:.5,sm:1.5},py:1.4,borderRadius:3,border:"1px solid",borderColor:"rgba(201,154,46,.4)",backgroundColor:"rgba(255,255,255,.10)",backdropFilter:"blur(8px)"}}><Typography variant="h4" sx={{fontWeight:900,lineHeight:1}}>{val(n)}</Typography><Typography variant="caption" sx={{opacity:.8}}>{t(s.locale,k)}</Typography></Box>)}</Stack> }
