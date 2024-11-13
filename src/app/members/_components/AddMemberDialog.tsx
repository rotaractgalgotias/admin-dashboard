"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlusIcon } from "lucide-react";
import { MemberType, Position, $Enums } from "@prisma/client";
import {
  councilPositions,
  directorAndCoordinatorPositions,
  memberTypes,
} from "../../../utils/positions";
import { toast } from "sonner";
import { createMember } from "../actions";
import { logAction } from "@/actions/logActions";
import { useUserStore } from "@/stores/userStore";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Invalid URL"),
  memberType: z.nativeEnum(MemberType).nullable(),
  position: z.nativeEnum(Position).nullable(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddMemberDialog() {
  const [open, setOpen] = useState(false);
  const [availablePositions, setAvailablePositions] = useState<Position[]>([]);
  const [showPositionSelect, setShowPositionSelect] = useState(false);
  const { user } = useUserStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      memberType: undefined,
      position: undefined,
    },
  });

  const memberType = watch("memberType");

  useEffect(() => {
    switch (memberType) {
      case MemberType.COUNCIL:
        setAvailablePositions(councilPositions);
        setShowPositionSelect(true);
        break;
      case MemberType.DIRECTOR:
      case MemberType.COORDINATOR:
        setAvailablePositions(directorAndCoordinatorPositions);
        setShowPositionSelect(true);
        break;
      case MemberType.MEMBER:
        setAvailablePositions([Position.MEMBER]);
        setShowPositionSelect(false);
        setValue("position", Position.MEMBER);
        break;
      default:
        setAvailablePositions([]);
        setShowPositionSelect(false);
    }
    if (memberType !== MemberType.MEMBER) {
      setValue("position", null);
    }
  }, [memberType, setValue]);

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Adding member...");
    try {
      const res = await createMember({
        name: data.name,
        imageUrl: data.imageUrl,
        memberType: data.memberType as $Enums.MemberType,
        position: data.position as $Enums.Position,
      });
      if (res.success) {
        toast.success(res.message, { id: toastId });
        await logAction({
          action: "CREATE",
          details: `${user?.name} added the member: ${data.name}`,
        });
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Error adding member", { id: toastId });
    }
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlusIcon className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input id="name" {...field} />}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => <Input id="imageUrl" {...field} />}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="memberType">Member Type</Label>
            <Controller
              name="memberType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <SelectTrigger id="memberType">
                    <SelectValue placeholder="Select member type" />
                  </SelectTrigger>
                  <SelectContent>
                    {memberTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.memberType && (
              <p className="text-sm text-red-500">
                {errors.memberType.message}
              </p>
            )}
          </div>
          {showPositionSelect && (
            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                  >
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePositions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.position && (
                <p className="text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>
          )}
          <Button type="submit" className="mt-4">
            Add Member
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
