import { Link } from "react-router";
import { ArrowRight, MapPin, Clock, Globe, Award, Shield, Users, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

export function Home() {
  // Hero carousel images
  const heroImages = [
    "/nature/IMG-20260421-WA0005.jpg",
    "https://images.unsplash.com/photo-1694336661976-5024d634d71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMHRyYWRpdGlvbmFsJTIwZGFuY2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTA4OTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1768357774088-cee45602e2bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZvcmVzdCUyMGNhbm9weSUyMGJyaWRnZSUyMHdhbGt3YXl8ZW58MXx8fHwxNzc1MDg0NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1651860282137-a59f01d2db7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMENhcGUlMjBDb2FzdCUyMENhc3RsZXxlbnwxfHx8fDE3NzUwODQ0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1750110734661-7095ebe2bf79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZHJ1bW1pbmclMjBwZXJmb3JtYW5jZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3NTIxMDMxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const regionalSites = [
    {
      region: "Greater Accra Region",
      sites: [
        "Independence Arch",
        "Kwame Nkrumah Memorial Park",
        "Labadi Beach",
        "Makola Market",
        "National Museum of Ghana",
        "James Town Lighthouse"
      ]
    },
    {
      region: "Central Region",
      sites: [
        "Cape Coast Castle",
        "Elmina Castle",
        "Kakum National Park",
        "Hans Cottage Botel",
        "Fort William",
        "Assin Manso Slave River"
      ]
    },
    {
      region: "Eastern Region",
      sites: [
        "Aburi Botanical Gardens",
        "Boti Falls",
        "Umbrella Rock",
        "Akosombo Dam",
        "Tetteh Quarshie Cocoa Farm",
        "Bunso Arboretum"
      ]
    },
    {
      region: "Ashanti Region",
      sites: [
        "Manhyia Palace Museum",
        "Lake Bosomtwe",
        "Kejetia Market",
        "Bonwire Kente Village",
        "Prempeh II Jubilee Museum",
        "Rattray Park"
      ]
    },
    {
      region: "Volta Region",
      sites: [
        "Wli Waterfalls",
        "Mount Afadjato",
        "Tafi Atome Monkey Sanctuary",
        "Amedzofe Canopy Walkway",
        "Tagbo Falls",
        "Lake Volta"
      ]
    },
    {
      region: "Northern Region",
      sites: [
        "Mole National Park",
        "Larabanga Mosque",
        "Paga Crocodile Pond",
        "Salaga Slave Market",
        "Nakpanduri Escarpment",
        "Tamale Cultural Centre"
      ]
    }
  ];

  const featuredDestinations = [
    {
      title: "Kakum National Park",
      description: "Walk among the treetops on Africa's longest canopy walkway, suspended 40 meters above the rainforest floor",
      image: "https://images.unsplash.com/photo-1768357774088-cee45602e2bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZvcmVzdCUyMGNhbm9weSUyMGJyaWRnZSUyMHdhbGt3YXl8ZW58MXx8fHwxNzc1MDg0NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Central Region"
    },
    {
      title: "Cape Coast Castle",
      description: "UNESCO World Heritage Site - Experience the powerful history of this 17th-century fortress",
      image: "https://images.unsplash.com/photo-1651860282137-a59f01d2db7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMENhcGUlMjBDb2FzdCUyMENhc3RsZXxlbnwxfHx8fDE3NzUwODQ0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Central Region"
    },
    {
      title: "Traditional Cultural Festival",
      description: "Immerse yourself in Ghana's vibrant traditions with colorful festivals and authentic ceremonies",
      image: "https://images.unsplash.com/photo-1694336661976-5024d634d71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMHRyYWRpdGlvbmFsJTIwZGFuY2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NTA4OTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "All Regions"
    },
    {
      title: "Mole National Park",
      description: "Ghana's largest wildlife sanctuary - Spot elephants, antelopes, and over 300 bird species",
      image: "https://images.unsplash.com/photo-1617198920209-220e1e8a652e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2FmYXJpJTIwZWxlcGhhbnRzJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzc1MDg0NDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Northern Region"
    },
    {
      title: "Lake Volta",
      description: "The world's largest man-made lake by surface area - A marvel of engineering and natural beauty",
      image: "https://images.unsplash.com/photo-1649519764616-bacf4a942730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYWtlJTIwVm9sdGElMjBHaGFuYSUyMGJvYXR8ZW58MXx8fHwxNzc1MDg0NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Eastern Region"
    },
    {
      title: "Ashanti Royal Heritage",
      description: "Witness the grandeur of the Ashanti Kingdom and its rich cultural ceremonies",
      image: "https://images.unsplash.com/photo-1660675133902-acd1b057f75d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMEFzaGFudGklMjBjaGllZiUyMHJveWFsJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzc1MjEwMzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Ashanti Region"
    },
    {
      title: "Traditional Drumming",
      description: "Experience the powerful rhythms and energy of authentic African drum performances",
      image: "https://images.unsplash.com/photo-1750110734661-7095ebe2bf79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZHJ1bW1pbmclMjBwZXJmb3JtYW5jZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3NTIxMDMxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "All Regions"
    },
    {
      title: "Coastal Fishing Villages",
      description: "Discover the traditional fishing communities and their vibrant way of life",
      image: "https://images.unsplash.com/photo-1740825354701-2b864744c090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGZpc2hpbmclMjB2aWxsYWdlJTIwYm9hdHN8ZW58MXx8fHwxNzc1MjEwMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Coastal Region"
    },
    {
      title: "Kente Textile Art",
      description: "Learn about Ghana's iconic Kente weaving tradition and its symbolic meanings",
      image: "https://images.unsplash.com/photo-1701189991917-162ce50220e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxXZXN0JTIwQWZyaWNhJTIwdGV4dGlsZSUyMHBhdHRlcm4lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzUyMTAzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Ashanti Region"
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "24/7 Available",
      description: "Round-the-clock service and support for all your tourism needs"
    },
    {
      icon: Users,
      title: "Expert Local Guides",
      description: "Experienced guides who bring Ghana's stories to life"
    },
    {
      icon: Award,
      title: "Premium Experience",
      description: "Carefully curated tours ensuring authentic cultural immersion"
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Consistently excellent reviews from satisfied travelers"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 relative overflow-hidden">
      {/* Kente Pattern Decorative Elements */}
      <div className="fixed top-0 left-0 w-32 h-32 opacity-10 pointer-events-none z-0">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, #FF6B00 10px, #FF6B00 20px, #008000 20px, #008000 30px)`,
        }}></div>
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none z-0">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, #FFD700 0px, #FFD700 10px, #FF6B00 10px, #FF6B00 20px, #008000 20px, #008000 30px)`,
        }}></div>
      </div>

      {/* Hero Section with Auto-Changing Background */}
      <div className="relative h-[800px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <ImageWithFallback
              src={heroImages[currentHeroIndex]}
              alt="Ghana Heritage"
              className="w-full h-full object-cover brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-amber-900/50 to-amber-900/70"></div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentHeroIndex ? 'bg-yellow-500 w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center z-10">
          <div className="text-center w-full">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            >
              <img src={logo} alt="Ananse Heritage Tours" className="h-64 mx-auto mb-8 drop-shadow-2xl" />
            </motion.div>
            
            <motion.h1 
              className="text-7xl md:text-8xl mb-8 font-bold text-white leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            >
              Where Stories Come Alive
            </motion.h1>
            
            <motion.p 
              className="text-3xl md:text-4xl mb-12 text-amber-50 leading-relaxed max-w-4xl mx-auto font-medium drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            >
              Experience the rich tapestry of Ghana's heritage, culture, and natural wonders
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
            >
              <Link
                to="/attractions"
                className="group inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 text-xl font-bold text-white"
              >
                Explore Ghana
                <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              <Link
                to="/plan-visit"
                className="inline-flex items-center justify-center px-12 py-6 bg-white/95 hover:bg-white backdrop-blur-md border-2 border-yellow-500 rounded-2xl transition-all duration-500 hover:border-yellow-600 text-xl font-bold text-gray-900 shadow-xl"
              >
                Plan Your Tour
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 15, 0] }}
          transition={{ opacity: { delay: 2, duration: 1 }, y: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
        >
          <div className="w-8 h-14 border-3 border-white rounded-full flex justify-center p-2 backdrop-blur-sm bg-white/20 shadow-xl">
            <div className="w-2 h-4 bg-yellow-500 rounded-full shadow-lg shadow-yellow-400/50"></div>
          </div>
        </motion.div>
      </div>

      {/* About Ghana Section */}
      <div className="py-28 bg-gradient-to-b from-white to-amber-50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-6xl md:text-7xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-green-600">
              Discover Ghana
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mb-10 rounded-full shadow-lg"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-6 text-gray-700 text-xl leading-relaxed"
            >
              <p className="text-3xl text-amber-600 font-bold mb-6">The Gateway to West Africa</p>
              <p>
                Ghana, officially the Republic of Ghana, is a country in West Africa bordered by Côte d'Ivoire, Burkina Faso, Togo, and the Gulf of Guinea. With a rich history spanning ancient kingdoms, colonial heritage, and modern independence, Ghana stands as a beacon of democracy and culture in Africa.
              </p>
              <p>
                In 1957, Ghana became the first sub-Saharan African nation to gain independence, led by the visionary Dr. Kwame Nkrumah. Today, Ghana is renowned for its warm hospitality, diverse ecosystems, vibrant traditions, and as the world's second-largest cocoa producer.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-6 rounded-2xl border-2 border-yellow-300 shadow-lg">
                  <Globe className="h-10 w-10 text-amber-600 mb-3" />
                  <p className="text-lg text-gray-600 font-medium">Population</p>
                  <p className="text-3xl font-bold text-gray-900">32M+</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl border-2 border-green-300 shadow-lg">
                  <MapPin className="h-10 w-10 text-green-600 mb-3" />
                  <p className="text-lg text-gray-600 font-medium">Regions</p>
                  <p className="text-3xl font-bold text-gray-900">16</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630386226447-af0a955c1009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaGFuYSUyMGluZGVwZW5kZW5jZSUyMGFyY2glMjBBY2NyYXxlbnwxfHx8fDE3NzUwODQ0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Independence Arch Ghana"
                  className="w-full h-[600px] object-cover brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-3xl font-bold drop-shadow-lg">Independence Arch, Accra</p>
                  <p className="text-yellow-300 text-lg mt-2 font-medium">Symbol of Freedom Since 1957</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="text-center group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-amber-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ y: -15 }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white mb-6 group-hover:shadow-2xl group-hover:shadow-yellow-400/50 transition-all duration-700"
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 1 }}
                >
                  <item.icon className="h-12 w-12" />
                </motion.div>
                <h3 className="text-2xl mb-4 font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Destinations - Dynamic Grid */}
      <div className="py-28 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-6xl md:text-7xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-green-600">
              Must-Visit Destinations
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mb-10 rounded-full shadow-lg"></div>
            <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Explore Ghana's most iconic landmarks and hidden gems
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 bg-white border-2 border-amber-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <div className="relative h-96 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                  >
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-full object-cover brightness-105"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                  
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white font-bold rounded-full text-sm shadow-lg">
                      {destination.region}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold text-white mb-3">{destination.title}</h3>
                    <p className="text-gray-200 text-lg leading-relaxed mb-4">{destination.description}</p>
                    <Link
                      to="/attractions"
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-bold text-lg group/link"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-3 transition-transform duration-500" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Tourist Sites */}
      <div className="py-28 bg-gradient-to-b from-white to-amber-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="text-6xl md:text-7xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-green-600">
              Explore by Region
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mb-10 rounded-full shadow-lg"></div>
            <p className="text-2xl text-gray-700 leading-relaxed">
              Ghana's 16 regions, each with unique attractions and experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionalSites.map((region, index) => (
              <motion.div
                key={index}
                className="bg-white backdrop-blur-sm border-2 border-amber-200 rounded-3xl p-8 hover:border-yellow-400 hover:shadow-2xl transition-all duration-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl mr-4 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{region.region}</h3>
                </div>
                <ul className="space-y-3">
                  {region.sites.map((site, siteIndex) => (
                    <motion.li
                      key={siteIndex}
                      className="flex items-center text-gray-700 text-lg group/item hover:text-amber-600 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: siteIndex * 0.05 }}
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300 shadow-sm"></span>
                      {site}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="py-32 bg-gradient-to-r from-yellow-500 via-amber-500 to-green-500 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Clock className="h-20 w-20 text-white mx-auto mb-6 drop-shadow-xl" />
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-7xl mb-8 font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Available 24/7 For You
          </motion.h2>
          <motion.p 
            className="text-3xl mb-14 text-white leading-relaxed max-w-3xl mx-auto font-medium drop-shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            Book your heritage tour today and embark on an unforgettable journey through Ghana's rich history and culture
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-12 py-6 bg-white text-amber-600 hover:bg-gray-50 rounded-2xl transition-all duration-500 font-bold text-xl shadow-2xl hover:shadow-white/50 hover:scale-110 group"
            >
              Contact Us Now
              <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center px-12 py-6 bg-gray-900/20 hover:bg-gray-900/30 backdrop-blur-md border-2 border-white rounded-2xl transition-all duration-500 hover:border-white text-xl font-bold text-white shadow-xl"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
