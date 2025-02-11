import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function CreateDuel({ dules }: { dules: string[] }) {
  return (
    <div className="p-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" bg-primary text-primary-foreground">
            Create Challenge
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {dules.map((dule: string, index: number) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={`select-${index}`} className="text-right">
                  {dule}
                </Label>
                <select id={`select-${index}`} className="col-span-3">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
