import { Box, SxProps } from "@mui/material";
import { ImgHTMLAttributes } from "react";
import { isBase64 } from "@prettylab/core/utils/image/isBase64";
import { addBase64Prefix } from "@prettylab/core/utils/image/addBase64Prefix";

export type ImgProps = {
  src: string;
  alt: string;
  sx?: SxProps;
  cover?: boolean;
  mimeType?: string;
  useAsBackground?: boolean;
};

export default function Img({
  src,
  alt,
  sx,
  cover,
  mimeType = "image/png",
  useAsBackground,
  ...props
}: ImgProps & ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) {
    return <Box sx={{ width: "100%", height: "100%", ...sx }} />;
  }

  const imageUrl = isBase64(src) ? addBase64Prefix(mimeType, src) : src;

  if (useAsBackground) {
    return (
      <Box
        sx={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: cover ? "cover" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          ...sx,
        }}
        {...props}
      />
    );
  }

  return (
    <Box
      src={imageUrl}
      component="img"
      alt={alt}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: cover ? "cover" : "contain",
        ...sx,
      }}
      {...props}
    />
  );
}
