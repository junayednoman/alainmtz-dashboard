import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertDialogCustomProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  onAction: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AAlertDialog({
  children,
  title = "Are you sure?",
  description = "Are you sure you want to continue?",
  cancelText = "Cancel",
  actionText = "Continue",
  onAction,
  open,
  onOpenChange,
}: AlertDialogCustomProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-primary-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
