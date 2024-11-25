import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from "@/lib/utils"

interface TabComponentProps {
    title: string
    content: Array<{
        title: string
        comp: React.ReactNode
    }>
}
export function TabComponent({
    title,
    content
}: TabComponentProps) {

    return (
        <Tabs.Root defaultValue={content[0].title}
            className={cn("w-full h-fit border-solid border-slate-200 border-2 rounded-md shadow-sm",

            )}>
            <Tabs.List className={cn(
                "flex items-center",
                "p-2 mb-1",
                "bg-slate-200 border-b border-gray-200"
            )}
            >
                <h4 className='text-xl font-semibold'>
                    {title}
                </h4>
                {content.map(({ title }) => {
                    return (
                        <Tabs.Trigger
                            key={`tab ${title}`}
                            value={title}
                            className={cn(
                                "mx-2 px-4 py-2 bg-slate-300 text-sm font-semibold text-slate-700 hover:text-gray-700 focus:outline-none focus:text-gray-200 focus:border-gray-200  focus:bg-gray-500",
                                "radix-state-active:border-b-2 radix-state-active:border-primary radix-state-active:text-primary",
                                "relative",
                                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
                                "after:scale-x-0 after:transition-transform after:duration-300",
                                "radix-state-active:after:scale-x-100"
                            )}
                        >
                            {title}
                        </Tabs.Trigger>
                    )
                })}
            </Tabs.List>
            {content.map(({ title, comp }) => {
                return (
                    <Tabs.Content key={`comp ${title}`} value={title} className="flex justify-center focus:outline-none ">
                        {comp}
                    </Tabs.Content>
                )
            })}

        </Tabs.Root>
    )
}

