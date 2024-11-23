import { useState, useEffect } from "react";

export function usePulseFreq (init: number = 1) {
    const [pulseFreq, setPulseFreq] = useState<number>(init)
    
    let period = 1/pulseFreq
    
    const setPeriod = (period: number) => {
        setPulseFreq(1/period)
    }
    
    useEffect(()=>{
        setPeriod(1/pulseFreq)
        setPulseFreq(1/period)
    },[pulseFreq, period])

    return { pulseFreq, setPulseFreq, period, setPeriod }
}
