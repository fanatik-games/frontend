import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";

export default function PayoutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 rounded-md w-full">Withdraw</Button>
      </DialogTrigger>
      <DialogContent className="p-4 max-w-sm bg-white shadow-lg rounded-md border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-md font-semibold text-gray-800">
            Withdraw Funds
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Make a withdrawal here. Click confirm when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <Label
            className="block text-sm text-gray-700 mb-1"
            htmlFor="withdraw-amount"
          >
            Amount
          </Label>
          <Input
            type="number"
            id="withdraw-amount"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="100"
          />
        </div>
        <DialogFooter>
          <Button type="submit" className=" w-full">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
