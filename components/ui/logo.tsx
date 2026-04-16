import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { width: 110, height: 40 },
  md: { width: 160, height: 58 },
  lg: { width: 320, height: 116 },
};

export function Logo({ className, priority = false, size = "md" }: LogoProps) {
  const dimensions = sizeMap[size];

  return (
    <Image
      src="/Xavathon-removebg-preview.png"
      alt="Xavathon"
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={className}
    />
  );
}
