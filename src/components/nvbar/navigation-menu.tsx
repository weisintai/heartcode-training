import { ModeToggle } from "@/components/mode-toggle";
import { NavigationMenu } from "../ui/navigation-menu";
import { NavigationItem } from "./navigation-item";
import { FloatingNav } from "../ui/floating-navbar";

const navItems = [
  {
    name: "Project Heartcode",
    link: "/",
  },
  {
    name: "Quiz",
    link: "/quiz",
  },
  {
    name: "About Me",
    link: "/about-me",
  },
];

export default function NavigationBar() {
  return (
    <>
      <NavigationMenu className="z-[11] list-none flex justify-between min-w-full h-[60px] px-5">
        <div className="flex flex-row justify-start gap-4">
          {navItems.map((navItem, index) => (
            <NavigationItem
              key={index}
              navigationLink={navItem.link}
              navigationDescription={navItem.name}
            />
          ))}
        </div>
        <div className="flex flex-row justify-end">
          <ModeToggle />
        </div>
      </NavigationMenu>
      <FloatingNav navItems={navItems} />
    </>
  );
}
