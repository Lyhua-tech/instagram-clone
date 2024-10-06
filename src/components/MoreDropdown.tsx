"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Activity,
  Bookmark,
  ChevronLeft,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Label } from "./ui/label";
import { Switch } from "@radix-ui/react-switch";

function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const [showModeToggle, setShowModeToggle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handleOutSideClick(event: MouseEvent) {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setShowModeToggle(false);
      }
    }

    document.addEventListener("mousedown", handleOutSideClick);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          className="md:w-full !justify-start space-x-2 !px-3"
          variant={"ghost"}
          size={"lg"}
        >
          <Menu />
          <div className="hidden md:block ">More</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={ref}
        className={cn(
          "dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity"
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
            <DropdownMenuItem className="menuItem">
              <Settings size={20} />
              <p>Settting</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Activity size={20} />
              <p>Your Activity</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Bookmark size={20} />
              <p>Saved</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="menuItem"
              onClick={() => setShowModeToggle(true)}
            >
              <Moon size={20} />
              <p>Switch Appearance</p>
            </DropdownMenuItem>
          </>
        )}
        {showModeToggle && (
          <>
            <div>
              <ChevronLeft size={18} onClick={() => setShowModeToggle(false)} />
              <p className="font-bold ml-1">Switch Appearance</p>
              {theme === "dark" ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>
            <Label htmlFor="dark-mode" className="menuItem">
              Dark Mode
              <DropdownMenuItem className="ml-auto !p-0">
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light");
                  }}
                />
              </DropdownMenuItem>
            </Label>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreDropdown;
