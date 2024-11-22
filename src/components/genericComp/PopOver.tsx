import {Root, Trigger, Portal, Content, Close, Arrow} from "@radix-ui/react-popover";
import { X } from "lucide-react";
import PopOverItem from "../ui/pop-over-item";


type PopOverProp = {
    label: string
    setItem: (string: string) => void
}

export function PopOver ({label, setItem}: PopOverProp) {
    
    return (
	<Root>
		<Trigger asChild>
			<button
				className="inline-flex cursor-default items-center justify-center px-1 bg-gray-400 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
				aria-label="Update dimensions"
			>
				<span>{label}</span>
			</button>
		</Trigger>
		<Portal>
			<Content
				className="w-[260px] rounded bg-gray-200 text-blue-500 p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
				sideOffset={5}
			>
				<div className="flex flex-col gap-2.5">
					<p className="mb-2.5 text-[15px] font-medium leading-[19px] text-mauve12">
						{label}
					</p>
					<PopOverItem label={'item'} setFunc={setItem}/>
				</div>
				<Close
					className="absolute right-[5px] top-[5px] inline-flex size-[25px] cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
					aria-label="Close"
				>
					<X />
				</Close>
				<Arrow className="fill-white" />
			</Content>
		</Portal>
	</Root>
)};

