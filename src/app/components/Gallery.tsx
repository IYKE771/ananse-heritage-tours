import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1772478298432-e2682258b74f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGxhbmRzY2FwZSUyMG5hdHVyZSUyMHNjZW5pY3xlbnwxfHx8fDE3NzQ4NDExOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Beautiful Ghana landscape",
      category: "Landscapes",
    },
    {
      src: "/landscape/IMG-20260421-WA0012.jpg",
      alt: "Beautiful Ghana landscape",
      category: "Landscapes",
    },
    {
      src: "https://images.unsplash.com/photo-1707565471630-f424febe40d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGJlYWNoJTIwcGFyYWRpc2UlMjBjb2FzdHxlbnwxfHx8fDE3NzQ4NDExOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Ghana beach paradise",
      category: "Beaches",
    },
    {
      src: "/beach/IMG-20260421-WA0013.jpg",
      category: "Beaches",
    },
    {
      src: "/beach/IMG-20260421-WA0010.jpg",
      category: "Beaches",
    },
    {
      src: "https://images.unsplash.com/photo-1769297468250-dfdea4662b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGNhc3RsZSUyMGhpc3RvcmljYWwlMjBmb3J0fGVufDF8fHx8MTc3NDg0MTE5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Historic castle",
      category: "Heritage",
    },
    {
      src: "/heritage/IMG-20260421-WA0025.jpg",
      alt: "Chief Crocrodie pond",
      category: "Heritage",
    },
    {
      src: "/heritage/IMG-20260421-WA0021.jpg",
      category: "Heritage",
    },
    {
      src: "/heritage/IMG-20260421-WA0004.jpg",
      category: "Heritage",
    },
    {
      src: "/heritage/IMG-20260421-WA0009.jpg",
      category: "Heritage",
    },
    {
      src: "https://images.unsplash.com/photo-1660675134062-7d3bbb340608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZSUyMGZlc3RpdmFsfGVufDF8fHx8MTc3NDg0MTE5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Traditional festival",
      category: "Culture",
    },
    {
      src: "https://images.unsplash.com/photo-1694336661976-5024d634d71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMHRyYWRpdGlvbmFsJTIwZGFuY2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTA4OTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Traditional dancers",
      category: "Culture",
    },
    {
      src: "/culture/IMG-20260407-WA0024.jpg",
      alt: "Traditional festival",
      category: "Culture",
    },
    {
      src: "/culture/IMG-20260421-WA0006.jpg",
      category: "Culture",
    },
    {
      src: "/culture/IMG-20260407-WA0025.jpg",
      category: "Culture",
    },
    {
      src: "https://images.unsplash.com/photo-1759157199492-c666caf856df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmFpbmZvcmVzdCUyMHRyb3BpY2FsJTIwbmF0dXJlfGVufDF8fHx8MTc3NDg0MTIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Tropical rainforest",
      category: "Nature",
    },
    {
      src: "/nature/IMG-20260421-WA0005.jpg",
      category: "Nature",
    },
    {
      src: "/nature/IMG-20260407-WA0018.jpg",
      category: "Nature",
    },
    {
      src: "/nature/IMG-20260421-WA0001.jpg",
      category: "Nature",
    },
    {
      src: "https://images.unsplash.com/photo-1697215861415-f854647a93d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMHdhdGVyZmFsbCUyMG5hdHVyZSUyMGJlYXV0aWZ1bHxlbnwxfHx8fDE3NzQ4NDExOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Majestic waterfall",
      category: "Nature",
    },
    {
      src: "/visitors/IMG-20260421-WA0011.jpg",
      alt: "Happy tourists",
      category: "Visitors",
    },
    {
      src: "/visitors/IMG-20260407-WA0022.jpg",
      alt: "Happy tourists",
      category: "Visitors",
    },
    {
      src: "/visitors/IMG-20260421-WA0020.jpg",
      alt: "Happy tourists",
      category: "Visitors",
    },
    {
      src: "/visitors/IMG-20260421-WA0023.jpg",
      alt: "Happy tourists",
      category: "Visitors",
    },
    {
      src: "/visitors/IMG-20260421-WA0015.jpg",
      alt: "Happy tourists",
      category: "Visitors",
    },
    {
      src: "/visitors/IMG-20260421-WA0002.jpg",
      alt: "Happy tourists",
      category: "Visitors",
    },
    {
      src: "https://images.unsplash.com/photo-1650815232474-12d5b9375d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGZvb2QlMjB0cmFkaXRpb25hbCUyMGN1aXNpbmV8ZW58MXx8fHwxNzc0ODQxMTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Traditional Ghanaian cuisine",
      category: "Food",
    },
    {
      src: "/foods/IMG-20260421-WA0003.jpg",
      alt: "Fruits",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1718766304636-cb9309953a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMEFjY3JhJTIwY2l0eSUyMGJ1aWxkaW5nc3xlbnwxfHx8fDE3NzQ4NDExOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Accra cityscape",
      category: "Urban",
    },
    {
      src: "https://images.unsplash.com/photo-1723922970319-6f92727e13cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGtlbnRlJTIwY2xvdGglMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NzQ4NDEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Kente cloth",
      category: "Culture",
    },
    {
      src: "https://images.unsplash.com/photo-1703604787785-e9ed9639ea6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxXZXN0JTIwQWZyaWNhJTIwc2F2YW5uYSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzQ4NDEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Savanna landscape",
      category: "Landscapes",
    },
    {
      src: "https://images.unsplash.com/photo-1680801237121-13222ddd73ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMG1hcmtldCUyMGNvbG9yZnVsJTIwdmlicmFudHxlbnwxfHx8fDE3NzQ4NDEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Vibrant local market",
      category: "Culture",
    },
    {
      src: "https://images.unsplash.com/photo-1768357774088-cee45602e2bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZvcmVzdCUyMGNhbm9weSUyMGJyaWRnZSUyMHdhbGt3YXl8ZW58MXx8fHwxNzc1MDg0NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Kakum canopy walkway",
      category: "Nature",
    },
    {
      src: "/wildlife/IMG-20260421-WA0017.jpg",
      alt: "Wildlife elephants",
      category: "Wildlife",
    },
    {
      src: "/wildlife/IMG-20260421-WA0016.jpg",
      category: "Wildlife",
    },
    {
      src: "https://images.unsplash.com/photo-1651860282137-a59f01d2db7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMENhcGUlMjBDb2FzdCUyMENhc3RsZXxlbnwxfHx8fDE3NzUwODQ0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Cape Coast Castle",
      category: "Heritage",
    },
  ];

  const categories = ["All", ...Array.from(new Set(galleryImages.map((img) => img.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-green-500 text-white py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-1/2 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{ x: [-150, 150], y: [0, 75, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            className="text-6xl md:text-7xl mb-8 font-bold drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Photo Gallery
          </motion.h1>
          <motion.p 
            className="text-2xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          >
            Experience Ghana through stunning imagery. Browse our collection capturing the essence of Ghanaian beauty, culture, and hospitality.
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <motion.div 
        className="bg-white/98 border-b-2 border-amber-300 sticky top-24 z-40 backdrop-blur-md shadow-xl"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 shadow-lg ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white scale-110 shadow-yellow-500/50"
                    : "bg-gradient-to-r from-amber-100 to-yellow-100 text-gray-800 hover:from-amber-200 hover:to-yellow-200 border-2 border-amber-300"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                  onClick={() => setSelectedImage(image.src)}
                  className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border-4 border-amber-200 bg-white"
                  whileHover={{ y: -15 }}
                >
                  <div className="relative h-96">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover brightness-105"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                        <motion.p 
                          className="text-white font-bold text-2xl mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          {image.alt}
                        </motion.p>
                        <motion.div 
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full text-sm font-bold text-white shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          {image.category}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-14 h-14 border-3 border-white rounded-full flex items-center justify-center backdrop-blur-sm bg-yellow-500/80 shadow-xl">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white hover:text-yellow-400 z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.div
              className="relative max-w-7xl max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={selectedImage}
                alt="Selected image"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border-4 border-yellow-500"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
