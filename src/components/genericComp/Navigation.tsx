import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/subComp/sidebar'



type SideBarNavProps = {
  pageList: Array<{
    label: string,
    content: React.ReactNode
  }>
}

export function SideNavigationComponent({ pageList }: SideBarNavProps) {
  const [activeTab, setActiveTab] = React.useState(pageList[0].label)

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="border-r">
          <SidebarContent>
            <SidebarMenu>
              {pageList.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.label)}
                    isActive={activeTab === item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <main className="flex-1 flex-row overflow-y-auto p-4 w-dvw ">


          <SidebarTrigger className="mb-4 lg:hidden" />
          {pageList.find(item => item.label === activeTab)?.content}
        </main>
      </div>
    </SidebarProvider>
  )
}