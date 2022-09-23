import Image from "next/image";

const ImageUI = ({ src, alt, width, height }: any) => {
  return <Image alt={alt} src={src} height={height} width={width} />;
};

export default ImageUI;
