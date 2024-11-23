"use client"

import {useState, useEffect} from "react"
import {Root, Thumb} from "@radix-ui/react-switch"

type OnOffButtonProps = {
  title: string[]
  value: boolean
  setValue: (bool: boolean) => void
}

export function  OnOffButton({title, value, setValue}: OnOffButtonProps) {

  const [fade, setFade] = useState(false);
  const [displayText, setDisplayText] = useState(title[0]);

  useEffect(() => {
    setDisplayText(displayText==title[0] ? title[1]: title[0])
    setFade(true);

    const timer = setTimeout(() => {
      setFade(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSwitchChange = (e: boolean) => {
    setValue(e)
  }

  return (
    <div className="flex items-center space-x-2">
      <h4 className={`transition-opacity duration-500 ease-in-out ${fade ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>{displayText}</h4>
      <Root
        checked={value}
        onCheckedChange={(e) => handleSwitchChange(e)}
        className={`w-[42px] h-[25px] ${value ? "bg-blue-600" : "bg-grey-400"} rounded-full relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200 ease-in-out 
        `}
      >
        <Thumb
          className={`block w-[21px] h-[21px] bg-white rounded-full shadow-lg transform transition-transform duration-200 ease-in-out ${value ? "translate-x-[19px]" : "translate-x-0.5"
            }`}
        />
      </Root>
      <label className="text-sm font-medium text-gray-700">
        {value ? "ON" : "OFF"}
      </label>
    </div>
  )
}