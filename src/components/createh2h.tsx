import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CreateH2h = () => {
  return (
    <div>
      <div className="flex items-center justify-center space-x-4 mb-4">
        <h2>Create a head to head prediction</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Head to Head Prediction</DialogTitle>
              <DialogDescription>
                Fill in the details to create a head to head prediction
              </DialogDescription>
            </DialogHeader>
            <form>
              <div className="grid grid-cols-2 gap-4 p-3">
                <label className="col-span-2">
                  Head to Head Challenge Title
                  <Input
                    type="text"
                    className="input"
                    placeholder="Ligi Mbayaa !!"
                  />
                </label>
                <label className="col-span-2">
                  Team Available for Prediction
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Manchester United Vs Bournmouth" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Games Available</SelectLabel>
                        <SelectItem value="game1">
                          Manchester United Vs Bournmouth
                        </SelectItem>
                        <SelectItem value="game2">
                          Liverpool Vs Crystal Palace
                        </SelectItem>
                        <SelectItem value="game3">
                          Chelsea Vs Arsenal
                        </SelectItem>
                        <SelectItem value="game4">
                          Manchester City Vs Wolves
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </label>
                <div className="flex justify-between items-center col-span-2 gap-4">
                  <label className="flex-1">
                    Wager In
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="FCPS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Currency Available</SelectLabel>
                          <SelectItem value="fcp">FCPS</SelectItem>
                          <SelectItem value="ecp">ECPs </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </label>
                  <label className="col-span-2">
                    Amount
                    <Input type="number" className="input" placeholder="100" />
                  </label>
                </div>
                <label className="col-span-2">
                  Place Your Prediction
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Home Win" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Prediction Available</SelectLabel>
                        <SelectItem value="home">Home Win</SelectItem>
                        <SelectItem value="draw">Draw</SelectItem>
                        <SelectItem value="away">Away Win</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </label>
              </div>
              <DialogFooter className="mt-4">
                <Button className="flex justify-center w-full">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateH2h;
