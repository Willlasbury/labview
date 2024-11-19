import { FC, ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

type TooltipWrapperProps = {
    children: ReactNode
    text?: string
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({ children, text }) =>  {
    if (text) {
        return (

            <>
                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            {children}
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content
                                className="select-none rounded bg-white text-black px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
                                sideOffset={5}
                            >
                                {text}
                                <Tooltip.Arrow className="fill-white" />
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