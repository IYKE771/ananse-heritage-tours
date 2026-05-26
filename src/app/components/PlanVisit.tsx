import { Clock, DollarSign, Calendar, Info, MapPin, Car, Utensils, Wifi, Shield, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function PlanVisit() {
  
  const amenities = [
    { icon: Car, title: "Transportation", description: "Comfortable air-conditioned vehicles" },
    { icon: Utensils, title: "Meals Included", description: "Traditional Ghanaian cuisine" },
    { icon: Wifi, title: "Free WiFi", description: "Stay connected on your journey" },
    { icon: Shield, title: "Travel Insurance", description: "Full coverage included" },
  ];

  const bestSeasons = [
    {
      season: "Dry Season (November - March)",
      description: "Best time for wildlife viewing and outdoor activities. Clear skies and comfortable temperatures.",
      highlights: ["Perfect for Mole National Park", "Ideal beach weather", "Festival season"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      season: "Rainy Season (April - October)",
      description: "Lush green landscapes and fewer crowds. Waterfalls are at their most spectacular.",
      highlights: ["Wli Falls at peak flow", "Lower tourism rates", "Vibrant vegetation"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 via-green-600 to-yellow-600 text-black py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl"
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
            Plan Your Heritage Tour
          </motion.h1>
          <motion.p 
            className="text-2xl font-medium max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          >
            Book your unforgettable journey through Ghana's rich history and natural wonders
          </motion.p>
        </div>
      </div>

      {/* 24/7 Availability Highlight */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border-2 border-yellow-500/30 rounded-3xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-green-500 mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="h-16 w-16 text-black" />
            </motion.div>
            <h2 className="text-6xl md:text-7xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
              Available 24/7
            </h2>
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Our dedicated team is ready to assist you around the clock. Book online anytime or call us for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+233200290770"
                className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-green-500 text-black rounded-2xl font-bold text-xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-500"
              >
                <Phone className="mr-3 h-6 w-6" />
                Call Now: +233200290770 / +233557482133
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 bg-white/10 border-2 border-yellow-500/50 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-500"
              >
                Book Online
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tour Packages */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex items-center mb-8">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-green-500 text-black mr-4 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <DollarSign className="h-8 w-8" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white">Tour Packages</h2>
              </div>

              <motion.div 
                className="bg-gradient-to-br from-yellow-500/5 to-green-500/5 border border-yellow-500/20 rounded-3xl p-8 space-y-6 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {[
                  { title: "What's Included", items: [
                    "Expert local tour guide",
                    "All entrance fees and permits",
                    "Transportation in A/C vehicle",
                    "Traditional Ghanaian lunch",
                    "Complimentary bottled water",
                    "Travel insurance coverage"
                  ]},
                  { title: "Popular Routes", items: [
                    "Cape Coast Castle and Elmina Castle",
                    "Kakum National Park Canopy Walk",
                    "Kumasi Cultural Heritage Tour",
                    "Mole National Park Safari",
                    "Wli Waterfalls Adventure",
                    "Accra City and Museums Tour"
                  ]}
                ].map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="font-bold mb-4 text-2xl text-yellow-400">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-center text-gray-300 text-lg group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 + itemIndex * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Location & Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex items-center mb-8">
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-green-500 text-black mr-4 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <MapPin className="h-8 w-8" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white">How to Reach Us</h2>
              </div>

              <motion.div 
                className="bg-gradient-to-br from-yellow-500/5 to-green-500/5 border border-yellow-500/20 rounded-3xl p-8 space-y-6 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {[
                  { title: "Our Office", content: "Ananse Heritage Tours\nAccra Central\nGreater Accra Region, Ghana", icon: MapPin },
                  { title: "Contact Information", content: "Phone: +233200290770 / +233557482133\nEmail: ananseheritagetours@gmail.com\nWhatsApp: +233200290770 / +233557482133", icon: Phone },
                  { title: "Pick-Up Services", content: "We offer complimentary hotel pick-up within Accra. Pick-ups from other cities available for an additional fee. Please specify your location when booking.", icon: Car }
                ].map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="group hover:bg-yellow-500/5 p-4 rounded-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center mb-3">
                      <info.icon className="h-6 w-6 text-yellow-400 mr-3" />
                      <h3 className="font-bold text-xl text-yellow-400">{info.title}</h3>
                    </div>
                    <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg pl-9">{info.content}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Best Time to Visit */}
          <motion.div 
            className="mt-28"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
                When to Visit Ghana
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {bestSeasons.map((season, index) => (
                <motion.div 
                  key={season.season}
                  className={`bg-gradient-to-br ${season.color} p-1 rounded-3xl shadow-2xl hover:shadow-yellow-500/30 transition-all duration-700`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-gray-900 rounded-3xl p-10 h-full">
                    <h3 className="text-4xl mb-6 font-bold text-white">{season.season}</h3>
                    <p className="text-gray-300 mb-8 text-xl leading-relaxed">{season.description}</p>
                    <h4 className="font-bold text-yellow-400 mb-4 text-xl">Highlights:</h4>
                    <ul className="space-y-3">
                      {season.highlights.map((highlight, hIndex) => (
                        <motion.li
                          key={hIndex}
                          className="flex items-center text-gray-300 text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.2 + hIndex * 0.1 }}
                        >
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Amenities */}
          <motion.div 
            className="mt-28"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
                Tour Amenities
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {amenities.map((amenity, index) => (
                <motion.div 
                  key={amenity.title}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.15 }}
                  whileHover={{ y: -15 }}
                >
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-green-500/20 border border-yellow-500/30 text-yellow-400 mb-8 group-hover:shadow-2xl group-hover:shadow-yellow-500/30 transition-all duration-700"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <amenity.icon className="h-12 w-12" />
                  </motion.div>
                  <h3 className="text-2xl mb-4 font-bold text-white">{amenity.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{amenity.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
