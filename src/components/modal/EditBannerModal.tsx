"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { TBannerFormData } from "@/validations/banner.validation";
import { cn } from "@/lib/utils";

export function EditBannerModal({ children }: { children: React.ReactNode }) {
  // Initialize the form with React Hook Form and Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBannerFormData>({
    defaultValues: {
      title: "Banner Title",
      description: "Banner Description",
    },
  });

  // Handle form submission
  const onSubmit = (data: TBannerFormData) => {
    console.log("New Banner Data:", data);
    // Add logic to submit the banner data (e.g., API call)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-3">
          {/* Title Field */}
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter banner title"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter banner description"
              rows={12}
              className={cn(
                "min-h-28", // Override any min-height to allow rows to take effect
                errors.description ? "border-destructive" : ""
              )}
              style={{ height: "auto" }} // Ensure CSS doesn't override rows
            />
            {errors.description && (
              <p className="text-destructive text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
