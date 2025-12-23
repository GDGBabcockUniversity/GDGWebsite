"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface ShareButtonProps {
  sectionId: string;
}

export default function ShareButton({ sectionId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors text-sm"
      title="Copy link to this section"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-green-500">Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}

