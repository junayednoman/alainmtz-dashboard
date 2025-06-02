import { CreateBannerModal } from "@/components/modal/CreateBannerModal";
import { EditBannerModal } from "@/components/modal/EditBannerModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Pencil, Plus } from "lucide-react";

const Banners = () => {
  return (
    <div className="rounded-xl p-6 bg-card text-center text-primary-foreground mt-6">
      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="text-lg font-bold">Banners</h4>
          </div>
          <CreateBannerModal>
            <button className="bg-background rounded-full p-2 cursor-pointer">
              <Plus size={15} />
            </button>
          </CreateBannerModal>
          <EditBannerModal>
            <button className="bg-background rounded-full p-2 cursor-pointer">
              <Pencil size={15} />
            </button>
          </EditBannerModal>
        </div>
      </div>
      <div className="mt-6 w-full">
        <Carousel className="w-[85%] mx-auto rounded-lg">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="bg-primary rounded-lg p-5">
                  <h4 className="text-2xl font-bold ">Banner {index + 1}</h4>
                  <p className="mt-3">
                    Win 💰 $1000 for achieving top sales in this month!
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Banners;
