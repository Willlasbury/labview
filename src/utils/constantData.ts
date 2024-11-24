export type subObjData = {
    array: Array<string>,
    unit: string | null
}

export type fakeDataObj = {
    pulseWidth: subObjData,
    lowResPulseWidth: subObjData,
    lowResPulseDC: subObjData,
    pulseFrequencey: subObjData,
    pulseGate: subObjData,
    pulseClockOut: subObjData,
    period: subObjData
}

export const constantData: fakeDataObj = {
     pulseWidth : { array : Array.from({length: 15}).map((_,i)=>`${i + 1}`), unit: '-9' },
     lowResPulseWidth : { array : Array.from({length: 15}).map((_,i)=>`${(i + 1)*Math.random()}`), unit: '-9' },
     lowResPulseDC : { array : Array.from({length: 15}).map((_,i)=>`${(i + 1)*Math.random()}`), unit: '-9' },
     pulseFrequencey : {array : Array.from({length: 15}).map((_,i)=>`${i + 1}`), unit: '-9'},
     pulseGate : {array : ['Pass All', 'Block All', 'Periodic', 'Single Shot'], unit: null},
     pulseClockOut : {array: Array.from({length: 11}).map((_,i) => `${2**(5-i)}`), unit: ''},
     period : {array: Array.from({length: 5}).map((_,i)=>`${i + 1}`), unit: 'n'},
}
