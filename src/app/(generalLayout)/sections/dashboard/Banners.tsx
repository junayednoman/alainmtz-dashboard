"use client";
import AError from "@/components/AError";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { CreateBannerModal } from "@/components/modal/CreateBannerModal";
import { EditBannerModal } from "@/components/modal/EditBannerModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "@/redux/api/bannerApi";
import BannerSkeleton from "@/skeletons/BannerSkeleton";
import handleMutation from "@/utils/handleMutation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const Banners = () => {
  const [currentSlideId, setCurrentSlideId] = useState<string>("");
  const [api, setApi] = useState<CarouselApi>();
  const { data, isLoading, isError, error, refetch } = useGetBannersQuery("");
  const banners = data?.data;

  useEffect(() => {
    if (!api || !banners) return;

    const handleSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      const currentBanner = banners[currentIndex];
      if (currentBanner) {
        setCurrentSlideId(currentBanner._id);
      }
    };

    api.on("select", handleSelect);
    handleSelect();

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, banners]);

  // handle delete banner
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();
  const handleDeleteBanner = async () => {
    await handleMutation(currentSlideId, deleteBanner, "Deleting banner...");
  };

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
          {currentSlideId && (
            <EditBannerModal id={currentSlideId}>
              <button className="bg-background rounded-full p-2 cursor-pointer">
                <Pencil size={15} />
              </button>
            </EditBannerModal>
          )}
        </div>
        <div>
          <AAlertDialog onAction={handleDeleteBanner}>
            <button
              disabled={isDeleting}
              className="p-2 rounded-md bg-destructive"
            >
              <Trash2 size={17} />
            </button>
          </AAlertDialog>
        </div>
      </div>
      <div className="mt-6 w-full">
        {isLoading ? (
          <BannerSkeleton />
        ) : isError ? (
          <AError onRetry={refetch} message={(error as any)?.data?.message} />
        ) : (
          <Carousel setApi={setApi} className="w-[85%] mx-auto rounded-lg">
            <CarouselContent>
              {banners?.map(
                (
                  item: { title: string; description: string; _id: string },
                  index: number
                ) => (
                  <CarouselItem key={index}>
                    <div className="bg-primary rounded-lg p-5">
                      <h4 className="text-2xl font-bold">{item.title}</h4>
                      <p className="mt-3">{item.description}</p>
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Banners;
