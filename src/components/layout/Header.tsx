import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import SearchComp from "./SearchComp";

export default function Header() {
  const [greeting, setGreeting] = useState("Hey");
  const { user } = useUserStore();

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  //    console.log(user);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex items-center justify-between px-10 py-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl capitalize font-semibold">
            <span className="sr-only">Current greeting: </span>
            {greeting},{" "}
            {user?.name && user?.name?.split(" ")?.length > 0
              ? user?.name?.split(" ")[0] ?? "User"
              : user?.name ?? "User"}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <SearchComp />
        </div>
      </div>
    </header>
  );
}
