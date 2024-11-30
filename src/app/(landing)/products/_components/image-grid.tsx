"use client";
import React, { useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: {
    url: string;
  }[];
  selectedIndex: number;
  onPrevious: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  title: string;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  isOpen,
  onOpenChange,
  images,
  selectedIndex,
  onPrevious,
  onNext,
  title,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col rounded-lg md:rounded-xl">
      <div className="relative flex-1 flex items-center justify-center w-full h-full min-h-[70vh]">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={images[selectedIndex]?.url}
            alt={`${title}-${selectedIndex + 1}`}
            className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

interface ImageGridProps {
  images: {
    url: string;
  }[];
  title: string;
}

const ImageGrid = ({ images, title }: ImageGridProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [layoutType, setLayoutType] = useState<
    "single" | "double" | "triple" | "multi"
  >("single");

  useEffect(() => {
    // Update layout type whenever images array changes
    if (images.length === 1) setLayoutType("single");
    else if (images.length === 2) setLayoutType("double");
    else if (images.length === 3) setLayoutType("triple");
    else setLayoutType("multi");

    // Reset selected index if it's out of bounds
    if (selectedImageIndex >= images.length) {
      setSelectedImageIndex(0);
    }
  }, [images, selectedImageIndex]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const SingleImageLayout = () => (
    <div className="w-auto md:w-[450px] aspect-square overflow-hidden rounded-lg">
      <img
        src={images[0]?.url}
        alt={title}
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => handleImageClick(0)}
      />
    </div>
  );

  const DoubleImageLayout = () => (
    <div className="w-auto md:w-[550px] h-[350px] flex gap-1 overflow-hidden rounded-lg">
      {images.slice(0, 2).map((image, idx) => (
        <img
          key={idx}
          src={image.url}
          alt={`${title}-${idx + 1}`}
          className="w-1/2 h-full object-cover cursor-pointer"
          onClick={() => handleImageClick(idx)}
        />
      ))}
    </div>
  );

  const TripleImageLayout = () => (
    <div className="w-auto md:w-[550px] h-[350px] overflow-hidden rounded-lg">
      <div className="flex h-full">
        <div className="w-1/2 pr-1">
          <img
            src={images[0]?.url}
            alt={`${title}-1`}
            className="w-full h-full object-cover cursor-pointer rounded-l-lg"
            onClick={() => handleImageClick(0)}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          {images.slice(1, 3).map((image, idx) => (
            <img
              key={idx + 1}
              src={image.url}
              alt={`${title}-${idx + 2}`}
              className={`w-full h-1/2 object-cover cursor-pointer ${
                idx === 0 ? "rounded-tr-lg" : "rounded-br-lg"
              }`}
              onClick={() => handleImageClick(idx + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const MultiImageLayout = () => (
    <div className="w-auto md:w-[550px] h-[350px] overflow-hidden rounded-lg">
      <div className="flex h-full">
        <div className="w-1/2 pr-1">
          <img
            src={images[0]?.url}
            alt={`${title}-1`}
            className="w-full h-full object-cover cursor-pointer rounded-l-lg"
            onClick={() => handleImageClick(0)}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          <img
            src={images[1]?.url}
            alt={`${title}-2`}
            className="w-full h-1/2 object-cover cursor-pointer rounded-tr-lg"
            onClick={() => handleImageClick(1)}
          />
          <div className="w-full h-1/2 flex gap-1">
            <img
              src={images[2]?.url}
              alt={`${title}-3`}
              className="w-1/2 h-full object-cover cursor-pointer"
              onClick={() => handleImageClick(2)}
            />
            <div className="w-1/2 h-full relative">
              <img
                src={images[3]?.url}
                alt={`${title}-4`}
                className="w-full h-full object-cover cursor-pointer rounded-br-lg"
                onClick={() => handleImageClick(3)}
              />
              {images.length > 4 && (
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-1 cursor-pointer rounded-br-lg"
                  onClick={() => handleImageClick(3)}
                >
                  <Plus className="size-7 shrink-0 text-white" />
                  <span className="text-5xl text-white font-medium select-none">
                    {images.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (layoutType) {
      case "single":
        return <SingleImageLayout />;
      case "double":
        return <DoubleImageLayout />;
      case "triple":
        return <TripleImageLayout />;
      case "multi":
        return <MultiImageLayout />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderLayout()}
      <ImageDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        images={images}
        selectedIndex={selectedImageIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        title={title}
      />
    </>
  );
};

export default ImageGrid;
