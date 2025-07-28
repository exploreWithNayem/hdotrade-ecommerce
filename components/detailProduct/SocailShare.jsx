"use client";
import { usePathname } from "next/navigation";
import getURL from "@/utils/getUrl";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
export default function SocialShare() {
  const pathname = usePathname();
  const currentURL = getURL(pathname);
  return (
    <div>
      <FacebookShareButton url={currentURL}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={currentURL}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={currentURL}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}
