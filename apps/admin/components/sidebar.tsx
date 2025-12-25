"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
  title: string;
  href?: string;
  icon?: any;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "User",
    icon: Users,
    children: [
      { title: "Admin", href: "/users/admin" },
      { title: "User", href: "/users/user" },
      { title: "Staff", href: "/users/staff" },
    ],
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>(["User"]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const renderNavItem = (item: NavItem) => {
    const isOpen = openItems.includes(item.title);
    const Icon = item.icon;

    if (item.children) {
      return (
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleItem(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-gray-100 text-gray-900"
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                <span>{item.title}</span>
              </div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-6 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link key={child.href} href={child.href || "#"}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-sm text-gray-900 hover:bg-gray-100",
                    pathname === child.href && "bg-blue-50 text-blue-600"
                  )}
                >
                  {child.title}
                </Button>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link key={item.href} href={item.href || "#"}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-900 hover:bg-gray-100",
            pathname === item.href && "bg-blue-50 text-blue-600"
          )}
        >
          {Icon && <Icon className="h-4 w-4 mr-2" />}
          {item.title}
        </Button>
      </Link>
    );
  };

  return (
    <div
      className={cn("flex h-full w-64 flex-col border-r bg-white", className)}
    >
      <div className="flex h-16 items-center border-b px-6 bg-white">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="bg-blue-500 text-white">
              AD
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900">Welcome</p>
            <p className="text-xs text-gray-500">Admin User</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4 px-3 bg-white">
        <nav className="space-y-1">{navItems.map(renderNavItem)}</nav>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-700 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
