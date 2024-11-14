export type subObjData = {
    array: Array<string>,
    unit: string | null
}

export type fakeDataObj = {
    pulseWidth: subObjData,
    pulseFrequencey: subObjData,
    pulseGate: subObjData,
    pulseClockOut: subObjData,
    period: subObjData
}

export const fakeData: fakeDataObj = {
     pulseWidth : { array : Array.from({length: 15}).map((_,i)=>`${i + 1}`), unit: '-9' },
     pulseFrequencey : {array : Array.from({length: 15}).map((_,i)=>`${i + 1}`), unit: '-9'},
     pulseGate : {array : ['Pass All', 'Block All', 'Periodic', 'Single Shot'], unit: null},
     pulseClockOut : {array: Array.from({length: 10}).map((_,i,a) => `${10 * (a.length-i)}`), unit: '+6'},
     period : {array: Array.from({length: 5}).map((_,i)=>`${i + 1}`), unit: 'n'},
}
