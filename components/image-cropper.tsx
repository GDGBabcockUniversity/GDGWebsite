"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { X, ZoomIn } from "lucide-react";
import { cropToDataUrl, OUTPUT_SIZE } from "@/lib/crop-image";

export { OUTPUT_SIZE };

interface ImageCropperProps {
  /** Object URL or data URL of the image being cropped. */
  src: string;
  onCancel: () => void;
  onCropped: (dataUrl: string) => void;
}

export default function ImageCropper({
  src,
  onCancel,
  onCropped,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setArea(pixels);
  }, []);

  const handleSave = async () => {
    if (!area) return;
    setBusy(true);
    setError(null);
    try {
      onCropped(await cropToDataUrl(src, area));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not crop that image");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative z-[101] min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#171717] p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gdg-cream">Crop photo</h2>
            <button
              onClick={onCancel}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* The crop surface. Square, because the card is. */}
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-black sm:h-80">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ZoomIn className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              aria-label="Zoom"
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-gdg-blue"
            />
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Drag to reposition, and zoom to frame. Saved as a {OUTPUT_SIZE}×
            {OUTPUT_SIZE} square.
          </p>

          {error && (
            <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-5 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-white/15 bg-transparent px-5 text-sm font-semibold text-gdg-cream hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={busy || !area}
              className="rounded-full bg-gdg-blue px-5 text-sm font-semibold text-white hover:bg-gdg-blue/90"
            >
              {busy ? "Saving…" : "Save photo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
