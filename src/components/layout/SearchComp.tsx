"use client";

import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchComp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get("q") ?? "");
  //   const [debouncedValue] = useDebounce(search, 5);

  //   React.useEffect(() => {
  //     setSearch(searchParams.get("q") ?? "");
  //   }, [searchParams]);

  //   React.useEffect(() => {
  //     const params = new URLSearchParams(window.location.search);
  //     params.set("q", debouncedValue);
  //     router.replace(`?${params.toString()}`);
  //   }, [debouncedValue, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        params.set("q", search);
        router.replace(`?${params.toString()}`);
      }}
      className="relative"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
          router.push(`?q=${e.target.value}`);
        }}
        value={search}
        className="w-[200px] pl-8 md:w-[300px]"
      />
    </form>
  );
}
