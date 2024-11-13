import { Badge } from "@/components/ui/badge";

type MemberType = "COUNCIL" | "DIRECTOR" | "COORDINATOR" | "MEMBER";

interface MemberTypeBadgeProps {
  memberType: MemberType;
}

export default function MemberTypeBadge({ memberType }: MemberTypeBadgeProps) {
  const getBadgeStyles = (type: MemberType) => {
    switch (type) {
      case "COUNCIL":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "DIRECTOR":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "COORDINATOR":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "MEMBER":
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles(
        memberType
      )}`}
    >
      {memberType}
    </Badge>
  );
}
