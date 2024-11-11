"use client"

import * as React from "react"
import * as Switch from "@radix-ui/react-switch"

export default function OnOffButton() {
  const [isOn, setIsOn] = React.useState(false)

  const handleSwitchChange = (checked: boolean) => {
    setIsOn(checked)
    console.log(`Switch is now ${checked ? "ON" : "OFF"}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch.Root
        checked={isOn}
        onCheckedChange={handleSwitchChange}
        className={`w-[42px] h-[25px] ${isOn ? "bg-blue-600" : "bg-grey-400"} rounded-full relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200 ease-in-out 
        `}
      >
        <Switch.Thumb
          className={`block w-[21px] h-[21px] bg-white rounded-full shadow-lg transform transition-transform duration-200 ease-in-out ${isOn ? "translate-x-[19px]" : "translate-x-0.5"
            }`}
        />
      </Switch.Root>
      <label className="text-sm font-medium text-gray-700">
        {isOn ? "ON" : "OFF"}
      </label>
    </div>
  )
}