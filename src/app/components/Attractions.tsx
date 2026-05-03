import { Mountain, Waves, Landmark, TreePine, Compass, Camera } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function Attractions() {
  const attractions = [
    {
      icon: Waves,
      title: "Coastal Paradise",
      description: "Experience Ghana's stunning Atlantic coastline with pristine beaches, crystal-clear waters, and vibrant coastal communities. From Busua to Kokrobite, discover golden sands perfect for relaxation, water sports, and unforgettable sunsets over the Gulf of Guinea.",
      image: "https://images.unsplash.com/photo-1707565471630-f424febe40d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGJlYWNoJTIwcGFyYWRpc2UlMjBjb2FzdHxlbnwxfHx8fDE3NzQ4NDExOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Beach Resorts", "Water Activities", "Seafood Cuisine", "Sunset Views"],
    },
    {
      icon: Landmark,
      title: "Historical Castles & Forts",
      description: "Journey through Ghana's rich history by visiting UNESCO World Heritage Sites including Cape Coast Castle and Elmina Castle. These powerful landmarks tell the story of Ghana's past and stand as monuments to resilience and remembrance.",
      image: "https://images.unsplash.com/photo-1769297468250-dfdea4662b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGNhc3RsZSUyMGhpc3RvcmljYWwlMjBmb3J0fGVufDF8fHx8MTc3NDg0MTE5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Guided Tours", "Museums", "Historical Archives", "Educational Programs"],
    },
    {
      icon: Camera,
      title: "Traditional Festivals & Culture",
      description: "Immerse yourself in Ghana's vibrant cultural tapestry through colorful festivals, traditional dances, and authentic ceremonies. Experience the Ashanti culture, witness Kente weaving, and participate in age-old customs that have been passed down for generations.",
      image: "https://images.unsplash.com/photo-1660675134062-7d3bbb340608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZSUyMGZlc3RpdmFsfGVufDF8fHx8MTc3NDg0MTE5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Cultural Festivals", "Traditional Dance", "Kente Weaving", "Drum Circles"],
    },
    {
      icon: TreePine,
      title: "Rainforest Adventures",
      description: "Explore Ghana's lush tropical rainforests and discover incredible biodiversity. Trek through Kakum National Park's famous canopy walkway, spot exotic wildlife, and immerse yourself in pristine nature that has thrived for millennia.",
      image: "https://images.unsplash.com/photo-1759157199492-c666caf856df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmFpbmZvcmVzdCUyMHRyb3BpY2FsJTIwbmF0dXJlfGVufDF8fHx8MTc3NDg0MTIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Canopy Walkways", "Wildlife Watching", "Nature Trails", "Eco-Tourism"],
    },
    {
      icon: Compass,
      title: "Waterfalls & Natural Wonders",
      description: "Visit spectacular waterfalls and natural formations throughout Ghana. From the majestic Wli Waterfalls to hidden gems in the Eastern Region, experience the raw beauty and power of Ghana's natural landscapes.",
      image: "https://images.unsplash.com/photo-1697215861415-f854647a93d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMHdhdGVyZmFsbCUyMG5hdHVyZSUyMGJlYXV0aWZ1bHxlbnwxfHx8fDE3NzQ4NDExOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Scenic Viewpoints", "Swimming Areas", "Hiking Trails", "Photography Spots"],
    },
    {
      icon: Mountain,
      title: "Urban Exploration - Accra",
      description: "Discover Ghana's vibrant capital city, Accra, where modernity meets tradition. Explore bustling markets, contemporary art galleries, world-class restaurants serving authentic Ghanaian cuisine, and experience the energetic nightlife of West Africa's most dynamic city.",
      image: "https://images.unsplash.com/photo-1718766304636-cb9309953a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMEFjY3JhJTIwY2l0eSUyMGJ1aWxkaW5nc3xlbnwxfHx8fDE3NzQ4NDExOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Makola Market", "Art Galleries", "Nightlife", "Street Food"],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-yellow-600 to-green-700 text-white py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{ x: [0, 150, 0], y: [0, 75, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            className="text-6xl md:text-7xl mb-8 font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Ghana's Attractions
          </motion.h1>
          <motion.p 
            className="text-2xl text-yellow-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          >
            Explore a nation rich in history, culture, and natural beauty - creating unforgettable memories in the heart of West Africa
          </motion.p>
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {attractions.map((attraction, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.div 
                  className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
                    <ImageWithFallback
                      src={attraction.image}
                      alt={attraction.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full text-white font-bold shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                      >
                        <attraction.icon className="h-6 w-6 mr-2" />
                        Featured Experience
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                >
                  <div className="flex items-center mb-8">
                    <motion.div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 text-white mr-6 shadow-xl"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 1 }}
                    >
                      <attraction.icon className="h-10 w-10" />
                    </motion.div>
                    <motion.h2 
                      className="text-5xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    >
                      {attraction.title}
                    </motion.h2>
                  </div>

                  <motion.p 
                    className="text-xl text-gray-700 mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                  >
                    {attraction.description}
                  </motion.p>

                  <div className="grid grid-cols-2 gap-5">
                    {attraction.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center text-gray-800 bg-gradient-to-r from-yellow-50 to-amber-50 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all group border-l-4 border-yellow-500"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.9 + featureIndex * 0.15 }}
                        whileHover={{ x: 8 }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-500"></div>
                        <span className="font-bold">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="py-28 bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{ x: [0, -150, 0], y: [0, 75, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-5xl md:text-6xl mb-8 font-bold text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Ready to Explore Ghana?
          </motion.h2>
          <motion.p 
            className="text-2xl text-yellow-100 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            Plan your visit today and discover all the amazing experiences waiting for you
          </motion.p>
          <motion.a
            href="/plan-visit"
            className="inline-flex items-center justify-center px-12 py-6 bg-white text-yellow-600 hover:bg-amber-50 rounded-xl transition-all duration-500 font-bold text-xl shadow-2xl hover:shadow-white/50 group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan Your Visit
            <svg className="ml-3 w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
