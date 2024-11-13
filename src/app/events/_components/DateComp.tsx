"use client";

import { TableCell } from "@/components/ui/table";
import { format } from "date-fns";

const DateComp = ({ date }: { date: Date }) => {
  return <TableCell>{format(new Date(date), "PPP")}</TableCell>;
};

export default DateComp;
