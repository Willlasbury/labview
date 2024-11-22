import { FC, ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useMouse } from "@/hooks/useMouse";

type TooltipWrapperProps = {
    children: ReactNode
    text?: string
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({ children, text }) => {
    const { ref, x, y } = useMouse();

    if (text) {
        return (

            <>
                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <div className="box" ref={ref}>
                                {children}
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content
                                className="z-10 select-none rounded bg-white border-solid  border-black border-2 text-black px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
                                align="start"
                                alignOffset={x}
                                sideOffset={-y + 10}
                                hideWhenDetached
                            >

                                {text}
                                {/* <Tooltip.Arrow className="fill-white border-solid  border-black border-2" /> */}
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </>
        )
    }

    return (<>{children}</>)
};

export default TooltipWrapper