import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export default function ImageLightbox({ isOpen, onClose, imageUrl, altText = "Image" }) {
  const [scale, setScale] = useState(1);

  // Reset scale when opened
  useEffect(() => {
    if (isOpen) setScale(1);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={onClose}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
            <button 
              onClick={handleZoomOut}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button 
              onClick={handleZoomIn}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md ml-2"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Container */}
          <div 
            className="relative max-w-full max-h-full flex items-center justify-center overflow-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()} // Prevent click outside when clicking the image wrapper
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: scale, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={imageUrl}
              alt={altText}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
