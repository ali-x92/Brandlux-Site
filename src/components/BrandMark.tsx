import { cn } from "@/lib/utils";
import markSrc from "@/assets/brandlux-mark.png";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={markSrc}
      alt="BrandLux mark"
      className={cn(
        "h-9 w-9 object-contain drop-shadow-[0_6px_18px_oklch(0.6_0.2_320/35%)]",
        className,
      )}
    />
  );
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="font-display text-xl font-extrabold tracking-tight">
        brand<span className="text-gradient">lux</span>
      </span>
    </div>
  );
}
