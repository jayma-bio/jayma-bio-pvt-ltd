"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SocialShare = () => {
  const pathname = usePathname();
  // Get the full URL by combining the base URL and current pathname
  const currentUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      currentUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`,
  };

  const handleShare =
    (platform: keyof typeof shareLinks) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      window.open(shareLinks[platform], "_blank", "width=600,height=400");
    };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h1 className="text-xl md:text-2xl font-medium md:font-semibold text-green">
        Share with friends
      </h1>
      <div className="flex items-center gap-5">
        <Link href={shareLinks.facebook} onClick={handleShare("facebook")}>
          <img
            src="/events/facebook.svg"
            alt="Share on Facebook"
            className="size-7 shrink-0"
          />
        </Link>
        <Link href={shareLinks.whatsapp} onClick={handleShare("whatsapp")}>
          <img
            src="/events/whatsapp.svg"
            alt="Share on WhatsApp"
            className="size-7 shrink-0"
          />
        </Link>
        <Link href={shareLinks.linkedin} onClick={handleShare("linkedin")}>
          <img
            src="/events/linkedin.svg"
            alt="Share on LinkedIn"
            className="size-7 shrink-0"
          />
        </Link>
      </div>
    </div>
  );
};

export default SocialShare;
