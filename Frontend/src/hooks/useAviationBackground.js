import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../services/api";

const DEFAULT_AVATION_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85"
];

export function useAviationBackground(activeCategory = "aviation", rotationIntervalMs = 9000) {
  const [images, setImages] = useState(DEFAULT_AVATION_BACKGROUNDS);
  const [activeLayer, setActiveLayer] = useState("A"); // "A" or "B"
  const [layerAUrl, setLayerAUrl] = useState(DEFAULT_AVATION_BACKGROUNDS[0]);
  const [layerBUrl, setLayerBUrl] = useState(DEFAULT_AVATION_BACKGROUNDS[1] || DEFAULT_AVATION_BACKGROUNDS[0]);
  const currentIndexRef = useRef(0);

  // Fetch categorized backgrounds from backend
  useEffect(() => {
    let isMounted = true;
    async function loadBackgrounds() {
      try {
        const fetched = await api.getBackgrounds(activeCategory);
        if (isMounted && Array.isArray(fetched) && fetched.length > 0) {
          setImages(fetched);
          currentIndexRef.current = 0;
          preloadAndSwap(fetched[0]);
        }
      } catch (err) {
        console.warn("Aviation background fallback in effect.", err);
      }
    }
    loadBackgrounds();
    return () => { isMounted = false; };
  }, [activeCategory]);

  // Preload next image asynchronously before crossfading
  const preloadAndSwap = useCallback((nextUrl) => {
    if (!nextUrl) return;
    const img = new Image();
    img.src = nextUrl;
    img.onload = () => {
      if (activeLayer === "A") {
        setLayerBUrl(nextUrl);
        setActiveLayer("B");
      } else {
        setLayerAUrl(nextUrl);
        setActiveLayer("A");
      }
    };
  }, [activeLayer]);

  // Automatic background crossfade rotation
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % images.length;
      const nextImage = images[currentIndexRef.current];
      preloadAndSwap(nextImage);
    }, rotationIntervalMs);

    return () => clearInterval(timer);
  }, [images, rotationIntervalMs, preloadAndSwap]);

  return {
    layerAUrl,
    layerBUrl,
    activeLayer,
    isLayerAActive: activeLayer === "A",
  };
}

export default useAviationBackground;
