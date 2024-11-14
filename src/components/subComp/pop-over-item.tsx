import * as Tooltip from "@radix-ui/react-tooltip";

type PopOverProps = {
    label: string,
    setFunc: (string: string) => void
}

export default function PopOverItem({ label, setFunc }: PopOverProps) {
    return (
        <fieldset className="flex items-center gap-5">
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <label
                            className="w-[75px] text-[13px] text-violet11"
                            htmlFor="width"
                        >
                            {label[0].toUpperCase() + label.slice(1)}
                        </label>

                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className="rounded bg-white text-black px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
                            side='bottom'
                            sideOffset={5}

                        >
                            <p>some description of <span className="font-bold">{label[0].toUpperCase() + label.slice(1)}</span></p>
                            <Tooltip.Arrow className="fill-white" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
            <input
                onChange={(e) => setFunc(e.target.value)}
                className="inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                id="width"
                defaultValue="100%"

            />
        </fieldset>
    )
}