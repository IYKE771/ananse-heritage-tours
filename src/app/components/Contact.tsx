import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Calendar, Users, Globe, Star, ChevronRight, AlertCircle, Loader, Check, X, Tag, Info } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

// ═══════════════════════════════════════════════════════════════════════════════
//  TOUR PACKAGE DATA — pricing, duration, inclusions, exclusions
//  Prices in USD per person (adult). Children 5–12 pay 60% of adult price.
//  Children under 5 are free. Accommodation multipliers applied on top.
// ═══════════════════════════════════════════════════════════════════════════════
export interface TourPackageData {
  name: string;
  pricePerDayAdult: number;   // Per person per day — Budget baseline
  accommodationMultipliers: { budget: number; standard: number; comfort: number; luxury: number };
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  description: string;
  // Group/institutional discount tiers
  groupDiscounts: { minSize: number; discount: number; label: string }[];
}

// Standard group discount tiers (shared across most packages)
const STD_GROUP_DISCOUNTS = [
  { minSize: 10, discount: 0.10, label: "10–19 people: 10% off" },
  { minSize: 20, discount: 0.18, label: "20–49 people: 18% off" },
  { minSize: 50, discount: 0.25, label: "50+ people: 25% off" },
];

const TOUR_DATA: Record<string, TourPackageData> = {
  "Elmina and Cape Coast Castle Heritage Tour": {
    name: "Elmina and Cape Coast Castle Heritage Tour",
    pricePerDayAdult: 107,
    accommodationMultipliers: { budget: 1, standard: 1.35, comfort: 1.7, luxury: 2.3 },
    highlights: ["Cape Coast Castle UNESCO World Heritage Site", "Elmina Castle, oldest European building in Africa", "Kakum National Park canopy walk", "Local fishing village visit", "Guided heritage storytelling tours"],
    inclusions: [
      "Nightly accommodation (per nights stayed)",
      "Daily breakfast and dinner",
      "Air-conditioned transport",
      "Expert local guide throughout",
      "All castle and park entrance fees",
      "Canopy walk fees",
      "Bottled water throughout the trip",
    ],
    exclusions: [
      "International flights",
      "Lunches (around $8 to $15 per day)",
      "Personal travel insurance",
      "Tips for your guide and driver",
      "Souvenirs and personal shopping",
    ],
    description: "Walk the same corridors as those who passed through Cape Coast and Elmina Castles centuries ago, visit a local fishing village, and end with a breathtaking canopy walk high above the Kakum rainforest. Stay as many days as you wish — every day reveals something new.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
  "Ashanti Kingdom Cultural Experience": {
    name: "Ashanti Kingdom Cultural Experience",
    pricePerDayAdult: 116,
    accommodationMultipliers: { budget: 1, standard: 1.35, comfort: 1.75, luxury: 2.4 },
    highlights: ["Manhyia Palace Museum", "Kente weaving workshop in Bonwire", "Kejetia Market visit", "Traditional Ashanti village homestay", "Royal cultural evening with food and storytelling"],
    inclusions: [
      "Nightly accommodation (per nights stayed)",
      "Daily breakfast and dinner",
      "Air-conditioned transport",
      "Dedicated Ashanti cultural guide",
      "Palace and museum entrance fees",
      "Hands-on Kente weaving workshop",
      "Traditional Ashanti feast evening",
      "Bottled water throughout the trip",
    ],
    exclusions: [
      "International flights",
      "Lunches (around $8 to $15 per day)",
      "Personal travel insurance",
      "Tips for your guide and driver",
      "Alcohol and personal purchases",
    ],
    description: "Live and breathe the culture of the Ashanti Kingdom at your own pace. Visit the Manhyia Palace, sit with master Kente weavers in Bonwire, explore the incredible Kejetia Market, and share an evening of food and storytelling with a local Ashanti family.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
  "Volta Region and Wli Waterfalls Adventure": {
    name: "Volta Region and Wli Waterfalls Adventure",
    pricePerDayAdult: 113,
    accommodationMultipliers: { budget: 1, standard: 1.3, comfort: 1.65, luxury: 2.2 },
    highlights: ["Wli Waterfalls, the tallest in West Africa", "Tafi Atome Monkey Sanctuary", "Akosombo Dam", "Lake Volta boat cruise", "Ho City cultural walk"],
    inclusions: [
      "Nightly accommodation (per nights stayed)",
      "Daily breakfast and dinner",
      "Air-conditioned transport",
      "Professional trekking guide",
      "All park and sanctuary entrance fees",
      "Lake Volta boat cruise",
      "Bottled water throughout the trip",
    ],
    exclusions: [
      "International flights",
      "Lunches (around $8 to $15 per day)",
      "Personal travel insurance",
      "Tips for your guide and driver",
      "Optional canoe hire at the falls",
    ],
    description: "Head into Ghana's eastern highlands to trek to the thundering Wli Waterfalls, meet wild Colobus monkeys at the Tafi Atome Sanctuary, and glide across the vast Lake Volta by boat. A perfect mix of nature, wildlife and culture — stay as long as you like.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
  "Kakum National Park Canopy Walk": {
    name: "Kakum National Park Canopy Walk",
    pricePerDayAdult: 105,
    accommodationMultipliers: { budget: 1, standard: 1.3, comfort: 1.6, luxury: 2.1 },
    highlights: ["Seven rope bridges 30 metres above the forest floor", "Guided rainforest birding walk", "Cape Coast town tour", "Night forest sounds experience"],
    inclusions: [
      "Nightly accommodation (per nights stayed)",
      "Breakfast and dinner",
      "Air-conditioned transport",
      "Certified park ranger guide",
      "All park and canopy walk entrance fees",
      "Bottled water throughout the trip",
    ],
    exclusions: [
      "International flights",
      "Lunches",
      "Personal travel insurance",
      "Tips for your guide and driver",
      "Optional butterfly sanctuary visit (around $5)",
    ],
    description: "Walk across seven swaying rope bridges 30 metres above one of Africa's last great tropical rainforests. Perfect as a short getaway or a longer nature immersion — birdwatching, night forest walks, and Cape Coast town are all included each day.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
  "Accra City and Arts Exploration": {
    name: "Accra City and Arts Exploration",
    pricePerDayAdult: 97,
    accommodationMultipliers: { budget: 1, standard: 1.4, comfort: 1.8, luxury: 2.5 },
    highlights: ["National Museum of Ghana", "Makola Market", "Jamestown Lighthouse and fishing harbour", "Artists Alliance Gallery", "Labadi Beach at sunset"],
    inclusions: [
      "Nightly accommodation (per nights stayed)",
      "Daily breakfast",
      "Private air-conditioned transport",
      "Expert Accra city guide",
      "Museum and gallery entrance fees",
      "Bottled water throughout the trip",
    ],
    exclusions: [
      "International flights",
      "Lunches and dinners (around $10 to $20 per day)",
      "Personal travel insurance",
      "Tips for your guide and driver",
      "Shopping and personal purchases",
    ],
    description: "Discover Accra as locals know it. Browse the National Museum, lose yourself in the colour of Makola Market, discover contemporary Ghanaian art at the Artists Alliance Gallery, and watch the sun go down over Labadi Beach. A relaxed but genuinely eye-opening city experience.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
  "Mole National Park Safari": {
    name: "Mole National Park Safari",
    pricePerDayAdult: 144,
    accommodationMultipliers: { budget: 1, standard: 1.35, comfort: 1.8, luxury: 2.6 },
    highlights: ["Elephant walking safari at dawn", "Warthogs, baboons and antelope on the plains", "Larabanga Mosque, oldest mosque in Ghana", "Mole Motel poolside elephant sightings", "Night game drive"],
    inclusions: [
      "Nightly accommodation including Mole Motel",
      "Daily breakfast and dinner",
      "Return transport from Accra to Mole",
      "Certified wildlife guide",
      "Morning walking safaris",
      "Night game drive",
      "All park entrance and conservation fees",
      "Bottled water throughout the trip",
    ],
    exclusions: [
      "International flights",
      "Lunches (around $10 to $15 per day)",
      "Personal travel insurance",
      "Tips for your guide and driver",
      "Optional binocular hire",
      "Alcoholic drinks",
    ],
    description: "Mole is Ghana's greatest wildlife destination. Walk with elephants at sunrise, watch warthogs and baboons roam the plains, explore the ancient Larabanga Mosque, and enjoy a night game drive under the northern sky. Spend as many days as you wish — wildlife sightings only get better.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
  "Kumasi Market and Kente Weaving Tour": {
    name: "Kumasi Market and Kente Weaving Tour",
    pricePerDayAdult: 113,
    accommodationMultipliers: { budget: 1, standard: 1.35, comfort: 1.7, luxury: 2.3 },
    highlights: ["Kejetia Market, largest open-air market in West Africa", "Bonwire Kente weaving village", "Kumasi Cultural Centre", "Okomfo Anokye Sword site", "Local fabric and craft shopping"],
    inclusions: [
      "Nightly accommodation (per nights stayed)",
      "Daily breakfast and dinner",
      "Air-conditioned transport",
      "Certified Ashanti cultural guide",
      "Kente village workshop and live demonstration",
      "Cultural centre entrance fees",
      "Bottled water throughout the trip",
    ],
    exclusions: [
      "International flights",
      "Lunches (around $8 to $12 per day)",
      "Personal travel insurance",
      "Tips for your guide and driver",
      "Kente fabric and personal purchases",
    ],
    description: "Experience Kumasi's vibrant Ashanti life — explore the jaw-dropping Kejetia Market, watch master weavers at work in the royal Kente village of Bonwire, and visit the Kumasi Cultural Centre. A colourful, energetic trip — choose your own pace and duration.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
  "Custom / Private Tour Package": {
    name: "Custom / Private Tour Package",
    pricePerDayAdult: 0,
    accommodationMultipliers: { budget: 1, standard: 1, comfort: 1, luxury: 1 },
    highlights: ["Fully personalised itinerary built around you", "Any combination of destinations across Ghana", "Private guide and vehicle throughout", "Flexible dates and duration", "Special occasions and group trips welcome"],
    inclusions: [
      "Everything planned around your preferences",
      "Private licensed guide",
      "Private air-conditioned vehicle",
      "Accommodation of your choice",
      "Meals as agreed in your quote",
      "All entrance fees as per your itinerary",
    ],
    exclusions: [
      "International flights",
      "Personal travel insurance",
      "Anything not listed in your personalised quote",
    ],
    description: "If none of our set packages quite fit what you have in mind, we will build one from scratch just for you. Tell us where you want to go, how long you have, and what kind of experience you are looking for, and we will take care of everything.",
    groupDiscounts: STD_GROUP_DISCOUNTS,
  },
};

const CHILD_DISCOUNT = 0.60; // children 5–12 pay 60% of adult price

function getGroupDiscount(pkg: TourPackageData, groupSize: number): number {
  if (!pkg.groupDiscounts || groupSize < 10) return 0;
  const tier = [...pkg.groupDiscounts].reverse().find(t => groupSize >= t.minSize);
  return tier ? tier.discount : 0;
}

function calculatePrice(
  pkg: TourPackageData,
  accommodation: string,
  adults: number,
  children: number,
  days: number,
  bookingType: "individual" | "group",
  groupSize: number,
): { adultUnitPerDay: number; childUnitPerDay: number; adultTotal: number; childTotal: number; grandTotal: number; groupDiscount: number; days: number } | null {
  if (!pkg || pkg.pricePerDayAdult === 0 || days < 1) return null;
  const mult = pkg.accommodationMultipliers[accommodation as keyof typeof pkg.accommodationMultipliers] ?? 1;
  const adultUnitPerDay = Math.round(pkg.pricePerDayAdult * mult);
  const childUnitPerDay = Math.round(adultUnitPerDay * CHILD_DISCOUNT);
  const effectiveSize = bookingType === "group" ? groupSize : adults + children;
  const groupDiscount = bookingType === "group" ? getGroupDiscount(pkg, effectiveSize) : 0;
  const discountMult = 1 - groupDiscount;
  const adultTotal = Math.round(adultUnitPerDay * adults * days * discountMult);
  const childTotal = Math.round(childUnitPerDay * children * days * discountMult);
  return { adultUnitPerDay, childUnitPerDay, adultTotal, childTotal, grandTotal: adultTotal + childTotal, groupDiscount, days };
}

//
//  HOW TO GET YOUR KEY (takes 2 minutes):
//  1. Go to https://web3forms.com
//  2. Enter your email:  iykemorrise@gmail.com
//  3. Click "Create Access Key"
//  4. Check your Gmail inbox — Web3Forms will email you an Access Key
//  5. Copy that key and paste it below, replacing YOUR_ACCESS_KEY_HERE
// ═══════════════════════════════════════════════════════════════════════════════
const WEB3FORMS_KEY = "cb98b90b-9ac2-46d0-a5b0-cde2f36cfe27";

const TOUR_PACKAGES = [
  "Elmina and Cape Coast Castle Heritage Tour",
  "Ashanti Kingdom Cultural Experience",
  "Volta Region and Wli Waterfalls Adventure",
  "Kakum National Park Canopy Walk",
  "Accra City and Arts Exploration",
  "Mole National Park Safari",
  "Kumasi Market and Kente Weaving Tour",
  "Custom / Private Tour Package",
];

export function Contact() {
  // ── Contact form ─────────────────────────────────────────────────────────
  const [contactData, setContactData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // ── Booking form ─────────────────────────────────────────────────────────
  const [bookingData, setBookingData] = useState({
    fullName: "", email: "", phone: "", nationality: "",
    tourPackage: "", travelDate: "",
    adults: "1", children: "0", accommodation: "standard",
    numberOfDays: "1",
    bookingType: "individual" as "individual" | "group",
    groupName: "", groupType: "", groupSize: "",
    specialRequests: "", howHeard: "",
  });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [activeTab, setActiveTab] = useState<"contact" | "booking">("contact");
  const [showPricingPanel, setShowPricingPanel] = useState(false);

  // Derived: current package data based on selection
  const selectedPkg = TOUR_DATA[bookingData.tourPackage] ?? null;
  const numDays = parseInt(bookingData.numberOfDays) || 1;
  const groupSize = parseInt(bookingData.groupSize) || (parseInt(bookingData.adults) + parseInt(bookingData.children));
  const priceBreakdown = selectedPkg
    ? calculatePrice(
        selectedPkg,
        bookingData.accommodation,
        parseInt(bookingData.adults) || 1,
        parseInt(bookingData.children) || 0,
        numDays,
        bookingData.bookingType,
        groupSize,
      )
    : null;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setContactData({ ...contactData, [e.target.name]: e.target.value });

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });

  // ── Contact submit → Web3Forms ────────────────────────────────────────────
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Contact] ${contactData.subject} — from ${contactData.name}`,
          from_name: contactData.name,
          replyto: contactData.email,
          message:
            `NAME: ${contactData.name}\n` +
            `EMAIL: ${contactData.email}\n` +
            `PHONE: ${contactData.phone || "N/A"}\n` +
            `SUBJECT: ${contactData.subject}\n\n` +
            `MESSAGE:\n${contactData.message}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContactStatus("success");
        setContactData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setContactStatus("idle"), 7000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      setContactStatus("error");
      setTimeout(() => setContactStatus("idle"), 7000);
    }
  };

  // ── Booking submit → Web3Forms ────────────────────────────────────────────
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[BOOKING] ${bookingData.tourPackage} — ${bookingData.travelDate} — ${bookingData.fullName}`,
          from_name: bookingData.fullName,
          replyto: bookingData.email,
          message:
            `════════════════════════════════════\n` +
            `   NEW TOUR BOOKING REQUEST\n` +
            `   Ananse Heritage Tours\n` +
            `════════════════════════════════════\n\n` +
            `GUEST DETAILS\n` +
            `─────────────────────────────────────\n` +
            `Full Name     : ${bookingData.fullName}\n` +
            `Email         : ${bookingData.email}\n` +
            `Phone         : ${bookingData.phone}\n` +
            `Nationality   : ${bookingData.nationality || "N/A"}\n\n` +
            `BOOKING TYPE  : ${bookingData.bookingType === "group" ? "Group / Institutional" : "Individual"}\n` +
            (bookingData.bookingType === "group"
              ? `Group Name    : ${bookingData.groupName || "N/A"}\n` +
                `Group Type    : ${bookingData.groupType || "N/A"}\n` +
                `Group Size    : ${bookingData.groupSize || "N/A"}\n`
              : "") +
            `\nTOUR DETAILS\n` +
            `─────────────────────────────────────\n` +
            `Package       : ${bookingData.tourPackage}\n` +
            `Number of Days: ${bookingData.numberOfDays}\n` +
            `Travel Date   : ${bookingData.travelDate}\n` +
            `Adults        : ${bookingData.adults}\n` +
            `Children      : ${bookingData.children}\n` +
            `Accommodation : ${bookingData.accommodation}\n\n` +
            `PRICE ESTIMATE\n` +
            `─────────────────────────────────────\n` +
            (priceBreakdown
              ? `Rate          : $${priceBreakdown.adultUnitPerDay}/adult/day\n` +
                `Duration      : ${priceBreakdown.days} day(s)\n` +
                `Adult (×${bookingData.adults}) : $${priceBreakdown.adultTotal.toLocaleString()}\n` +
                (parseInt(bookingData.children) > 0
                  ? `Children (×${bookingData.children}) : $${priceBreakdown.childTotal.toLocaleString()}\n`
                  : "") +
                (priceBreakdown.groupDiscount > 0
                  ? `Group Discount: ${Math.round(priceBreakdown.groupDiscount * 100)}% applied\n`
                  : "") +
                `GRAND TOTAL   : $${priceBreakdown.grandTotal.toLocaleString()} USD (estimate)\n`
              : `Custom package — pricing to be confirmed\n`) +
            `\nADDITIONAL INFO\n` +
            `─────────────────────────────────────\n` +
            `Special Requests : ${bookingData.specialRequests || "None"}\n` +
            `How They Heard   : ${bookingData.howHeard || "N/A"}\n`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingStatus("success");
        setBookingData({
          fullName: "", email: "", phone: "", nationality: "", tourPackage: "",
          travelDate: "", adults: "1", children: "0",
          accommodation: "standard", numberOfDays: "1",
          bookingType: "individual", groupName: "", groupType: "", groupSize: "",
          specialRequests: "", howHeard: "",
        });
        setTimeout(() => setBookingStatus("idle"), 7000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      setBookingStatus("error");
      setTimeout(() => setBookingStatus("idle"), 7000);
    }
  };

  // ── Contact info cards ────────────────────────────────────────────────────
  const contactInfo = [
    {
      icon: Phone, title: "Call Us (24/7)",
      details: [
        { label: "+233200290770", href: "tel:++233200290770" },
        { label: "+233557482133", href: "tel:+233557482133" },
      ],
      color: "from-yellow-400 to-amber-500",
    },
    {
      icon: Mail, title: "Email Us",
      details: [
        { label: "ananseheritagetours@gmail.com", href: "mailto:ananseheritagetours@gmail.com" },
      ],
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: MapPin, title: "Visit Our Office",
      details: [
        { label: "Ananse Heritage Tours", href: null },
        { label: "Accra Central, Ghana", href: null },
      ],
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Clock, title: "Available Hours",
      details: [
        { label: "24/7 Service", href: null },
        { label: "Always Ready to Assist", href: null },
      ],
      color: "from-yellow-500 to-amber-600",
    },
  ];

  const inputClass =
    "w-full px-5 py-3.5 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-gray-900 text-base shadow-sm";
  const labelClass = "block text-base font-bold text-gray-800 mb-1.5";

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50">

      {/* Hero */}
      <div className="relative py-28 overflow-hidden">
        <motion.div className="absolute inset-0" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2 }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1663022439116-b40cd319c78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxXZXN0JTIwQWZyaWNhJTIwY29udGFjdCUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NTA4OTA0NHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Contact Us" className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-yellow-900/70 to-green-900/80" />
        </motion.div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 className="text-6xl md:text-7xl mb-8 font-bold text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            Get In Touch
          </motion.h1>
          <motion.p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}>
            We're available 24/7 to help you plan your perfect Ghanaian adventure
          </motion.p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div key={index}
                className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 bg-gradient-to-br ${info.color} p-1`}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.15 }} whileHover={{ y: -15 }}>
                <div className="bg-white rounded-3xl p-8 h-full">
                  <motion.div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} text-white mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.8 }}>
                    <info.icon className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-2xl mb-4 font-bold text-gray-900">{info.title}</h3>
                  {info.details.map((detail, i) =>
                    detail.href ? (
                      <a key={i} href={detail.href}
                        className="block text-amber-600 hover:text-amber-800 text-lg leading-relaxed underline underline-offset-2 decoration-amber-300 hover:decoration-amber-600 transition-colors duration-200 break-all">
                        {detail.label}
                      </a>
                    ) : (
                      <p key={i} className="text-gray-600 text-lg leading-relaxed">{detail.label}</p>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Forms Section */}
      <div className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Tab switcher */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex bg-amber-100 rounded-2xl p-1.5 shadow-inner gap-2">
              {(["contact", "booking"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg scale-105"
                      : "text-amber-700 hover:text-amber-900"
                  }`}>
                  {tab === "contact" ? "✉️  Send a Message" : "🌍  Book a Tour"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT — active form */}
            <motion.div key={activeTab} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}>

              {activeTab === "contact" ? (
                /* ── CONTACT FORM ── */
                <>
                  <h2 className="text-5xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-green-600">
                    Send Us a Message
                  </h2>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-green-500 mb-10 rounded-full shadow-lg" />

                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input type="text" name="name" value={contactData.name} onChange={handleContactChange}
                        required placeholder="Enter your full name" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" name="email" value={contactData.email} onChange={handleContactChange}
                        required placeholder="your.email@example.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" name="phone" value={contactData.phone} onChange={handleContactChange}
                        placeholder="+233 XXX XXX XXX" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Subject *</label>
                      <select name="subject" value={contactData.subject} onChange={handleContactChange}
                        required className={inputClass}>
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Tour Booking">Tour Booking</option>
                        <option value="Group Tour Request">Group Tour Request</option>
                        <option value="Custom Tour Package">Custom Tour Package</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Message *</label>
                      <textarea name="message" value={contactData.message} onChange={handleContactChange}
                        required rows={5} placeholder="Tell us about your travel plans and how we can help…"
                        className={`${inputClass} resize-none`} />
                    </div>

                    <motion.button type="submit" disabled={contactStatus === "sending"}
                      className="w-full inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 disabled:opacity-70 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-yellow-500/50 group transition-all duration-300"
                      whileHover={{ scale: contactStatus === "sending" ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
                      {contactStatus === "sending"
                        ? <><Loader className="mr-3 h-6 w-6 animate-spin" /> Sending…</>
                        : <><Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" /> Send Message</>}
                    </motion.button>
                  </form>

                  {contactStatus === "success" && (
                    <motion.div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-2xl flex items-center shadow-xl"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <CheckCircle className="h-8 w-8 text-green-600 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-green-900 text-xl">Message sent successfully!</p>
                        <p className="text-green-700">We've received your message and will reply within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}
                  {contactStatus === "error" && (
                    <motion.div className="mt-6 p-6 bg-red-50 border-2 border-red-300 rounded-2xl flex items-center shadow-xl"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <AlertCircle className="h-8 w-8 text-red-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-red-800 text-xl">Something went wrong</p>
                        <p className="text-red-600">Please try again or email us directly at iykemorrise@gmail.com</p>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                /* ── BOOKING FORM ── */
                <>
                  <h2 className="text-5xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-green-600">
                    Book Your Tour
                  </h2>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    Fill in the form and your booking request lands directly in our inbox. We'll confirm availability and pricing within 24 hours.
                  </p>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-green-500 mb-8 rounded-full shadow-lg" />

                  <form onSubmit={handleBookingSubmit} className="space-y-5">

                    {/* Guest details */}
                    <div className="bg-amber-50 rounded-2xl p-5 space-y-4 border border-amber-200">
                      <h3 className="font-bold text-amber-800 text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" /> Guest Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Full Name *</label>
                          <input type="text" name="fullName" value={bookingData.fullName} onChange={handleBookingChange}
                            required placeholder="Your full name" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Nationality</label>
                          <input type="text" name="nationality" value={bookingData.nationality} onChange={handleBookingChange}
                            placeholder="e.g. American, British" className={inputClass} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input type="email" name="email" value={bookingData.email} onChange={handleBookingChange}
                            required placeholder="your@email.com" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Phone Number *</label>
                          <input type="tel" name="phone" value={bookingData.phone} onChange={handleBookingChange}
                            required placeholder="+233 XXX XXX XXX" className={inputClass} />
                        </div>
                      </div>
                    </div>

                    {/* Booking Type Toggle */}
                    <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                      <h3 className="font-bold text-blue-800 text-lg flex items-center gap-2 mb-4">
                        <Users className="h-5 w-5" /> Booking Type
                      </h3>
                      <div className="flex gap-3">
                        {(["individual", "group"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setBookingData({ ...bookingData, bookingType: type })}
                            className={`flex-1 py-3 px-4 rounded-xl font-bold text-base transition-all duration-300 border-2 ${
                              bookingData.bookingType === type
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg scale-105"
                                : "bg-white text-blue-700 border-blue-200 hover:border-blue-400"
                            }`}
                          >
                            {type === "individual" ? "👤 Individual" : "🏢 Group / Institution"}
                          </button>
                        ))}
                      </div>

                      {/* Group details box */}
                      {bookingData.bookingType === "group" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-3 overflow-hidden"
                        >
                          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800">
                            <strong>Group discounts apply automatically:</strong> 10–19 people (10% off) · 20–49 people (18% off) · 50+ people (25% off)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className={labelClass}>Organisation / Group Name *</label>
                              <input type="text" name="groupName" value={bookingData.groupName}
                                onChange={handleBookingChange}
                                placeholder="e.g. University of Ghana, Heritage Society"
                                className={inputClass} />
                            </div>
                            <div>
                              <label className={labelClass}>Group Type *</label>
                              <select name="groupType" value={bookingData.groupType}
                                onChange={handleBookingChange} className={inputClass}>
                                <option value="">Select group type</option>
                                <option value="Educational Institution">Educational Institution</option>
                                <option value="Corporate / Company">Corporate / Company</option>
                                <option value="NGO / Non-Profit">NGO / Non-Profit</option>
                                <option value="Religious / Faith Group">Religious / Faith Group</option>
                                <option value="Sports / Recreation Club">Sports / Recreation Club</option>
                                <option value="Family Group">Family Group</option>
                                <option value="Tour Operator / Agency">Tour Operator / Agency</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>Total Group Size *</label>
                            <input type="number" name="groupSize" value={bookingData.groupSize}
                              onChange={handleBookingChange}
                              min="2" max="500" placeholder="Total number of people in group"
                              className={inputClass} />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Tour details */}
                    <div className="bg-green-50 rounded-2xl p-5 space-y-4 border border-green-200">
                      <h3 className="font-bold text-green-800 text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5" /> Tour Details
                      </h3>
                      <div>
                        <label className={labelClass}>Tour Package *</label>
                        <select name="tourPackage" value={bookingData.tourPackage} onChange={handleBookingChange}
                          required className={inputClass}>
                          <option value="">Select a tour package</option>
                          {TOUR_PACKAGES.map((pkg) => <option key={pkg} value={pkg}>{pkg}</option>)}
                        </select>
                      </div>

                      {/* Number of Days — client-controlled */}
                      <div>
                        <label className={labelClass}>
                          Number of Days *
                          {selectedPkg && selectedPkg.pricePerDayAdult > 0 && (
                            <span className="ml-2 text-green-600 font-normal text-sm">
                              (${Math.round(selectedPkg.pricePerDayAdult * (selectedPkg.accommodationMultipliers[bookingData.accommodation as keyof typeof selectedPkg.accommodationMultipliers] ?? 1))}/person/day)
                            </span>
                          )}
                        </label>
                        <div className="flex items-center gap-3">
                          <button type="button"
                            onClick={() => setBookingData(prev => ({ ...prev, numberOfDays: String(Math.max(1, parseInt(prev.numberOfDays || "1") - 1)) }))}
                            className="w-12 h-12 rounded-xl bg-green-200 hover:bg-green-300 text-green-800 font-bold text-2xl flex items-center justify-center transition-colors flex-shrink-0">
                            −
                          </button>
                          <input type="number" name="numberOfDays" value={bookingData.numberOfDays}
                            onChange={handleBookingChange}
                            required min="1" max="60"
                            className={`${inputClass} text-center text-xl font-bold`} />
                          <button type="button"
                            onClick={() => setBookingData(prev => ({ ...prev, numberOfDays: String(Math.min(60, parseInt(prev.numberOfDays || "1") + 1)) }))}
                            className="w-12 h-12 rounded-xl bg-green-200 hover:bg-green-300 text-green-800 font-bold text-2xl flex items-center justify-center transition-colors flex-shrink-0">
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Travel Start Date *</label>
                        <input type="date" name="travelDate" value={bookingData.travelDate} onChange={handleBookingChange}
                          required min={new Date().toISOString().split("T")[0]} className={inputClass} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>Adults *</label>
                          <input type="number" name="adults" value={bookingData.adults} onChange={handleBookingChange}
                            required min="1" max="50" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Children (5–12)</label>
                          <input type="number" name="children" value={bookingData.children} onChange={handleBookingChange}
                            min="0" max="50" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Accommodation</label>
                          <select name="accommodation" value={bookingData.accommodation} onChange={handleBookingChange}
                            className={inputClass}>
                            <option value="budget">Budget</option>
                            <option value="standard">Standard</option>
                            <option value="comfort">Comfort</option>
                            <option value="luxury">Luxury</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* ── LIVE PRICING & PACKAGE DETAILS PANEL ── */}
                    <AnimatePresence>
                      {selectedPkg && (
                        <motion.div
                          key={bookingData.tourPackage}
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-xl"
                        >
                          {/* Panel header */}
                          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white font-bold text-lg">
                              <Tag className="h-5 w-5" />
                              Package Summary & Pricing
                            </div>
                            <button
                              type="button"
                              onClick={() => setShowPricingPanel(!showPricingPanel)}
                              className="text-white/80 hover:text-white text-sm underline"
                            >
                              {showPricingPanel ? "Hide details" : "Show full details"}
                            </button>
                          </div>

                          <div className="bg-white p-5 space-y-5">
                            {/* Quick stats row */}
                            <div className="flex flex-wrap gap-3">
                              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1.5 rounded-full">
                                <Calendar className="h-4 w-4" /> {selectedPkg.days > 0 ? `${selectedPkg.days} Days` : "Custom Duration"}
                              </span>
                              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1.5 rounded-full">
                                <Star className="h-4 w-4" /> {bookingData.accommodation.charAt(0).toUpperCase() + bookingData.accommodation.slice(1)} Accommodation
                              </span>
                              {selectedPkg.days > 0 && (
                                <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1.5 rounded-full">
                                  <Users className="h-4 w-4" /> {bookingData.adults} Adult{parseInt(bookingData.adults) !== 1 ? "s" : ""}{parseInt(bookingData.children) > 0 ? ` · ${bookingData.children} Child${parseInt(bookingData.children) !== 1 ? "ren" : ""}` : ""}
                                </span>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">{selectedPkg.description}</p>

                            {/* Price breakdown */}
                            {priceBreakdown ? (
                              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                  <Info className="h-3.5 w-3.5" /> Estimated Price Breakdown
                                </p>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Adults × {bookingData.adults} <span className="text-gray-400">(${priceBreakdown.adultUnit}/person)</span></span>
                                    <span className="font-bold text-gray-900">${priceBreakdown.adultTotal.toLocaleString()}</span>
                                  </div>
                                  {parseInt(bookingData.children) > 0 && (
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Children × {bookingData.children} <span className="text-gray-400">(${priceBreakdown.childUnit}/child · 40% off)</span></span>
                                      <span className="font-bold text-gray-900">${priceBreakdown.childTotal.toLocaleString()}</span>
                                    </div>
                                  )}
                                  <div className="border-t border-amber-300 pt-2 mt-2 flex justify-between items-center">
                                    <span className="font-bold text-gray-900 text-base">Total Estimate</span>
                                    <span className="text-2xl font-bold text-amber-600">${priceBreakdown.grandTotal.toLocaleString()} <span className="text-sm text-gray-500 font-normal">USD</span></span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-3 leading-snug">* Children aged 5–12 receive 40% discount. Under 5 are free. Prices are estimates — final confirmed pricing will be provided within 24 hours of booking request.</p>
                              </div>
                            ) : (
                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                                <strong>Custom package:</strong> Pricing will be tailored to your specific itinerary. Submit your request and we'll send a personalised quote within 24 hours.
                              </div>
                            )}

                            {/* Highlights */}
                            <div>
                              <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Tour Highlights</p>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {selectedPkg.highlights.map((h, i) => (
                                  <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                                    <Star className="h-3.5 w-3.5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Inclusions / Exclusions expandable */}
                            <AnimatePresence>
                              {showPricingPanel && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
                                >
                                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                      <Check className="h-3.5 w-3.5" /> What's Included
                                    </p>
                                    <ul className="space-y-1.5">
                                      {selectedPkg.inclusions.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                      <X className="h-3.5 w-3.5" /> Not Included
                                    </p>
                                    <ul className="space-y-1.5">
                                      {selectedPkg.exclusions.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Extra */}
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass}>Special Requests / Dietary Needs</label>
                        <textarea name="specialRequests" value={bookingData.specialRequests} onChange={handleBookingChange}
                          rows={3} placeholder="Allergies, mobility needs, special occasions…"
                          className={`${inputClass} resize-none`} />
                      </div>
                      <div>
                        <label className={labelClass}>How did you hear about us?</label>
                        <select name="howHeard" value={bookingData.howHeard} onChange={handleBookingChange} className={inputClass}>
                          <option value="">Select an option</option>
                          <option value="Google Search">Google Search</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Friend / Family">Friend / Family</option>
                          <option value="Travel Blog">Travel Blog</option>
                          <option value="Tour Aggregator">Tour Aggregator</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <motion.button type="submit" disabled={bookingStatus === "sending"}
                      className="w-full inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-70 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-green-500/50 group transition-all duration-300"
                      whileHover={{ scale: bookingStatus === "sending" ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
                      {bookingStatus === "sending"
                        ? <><Loader className="mr-3 h-6 w-6 animate-spin" /> Sending Booking…</>
                        : <><Calendar className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                            Submit Booking Request
                            <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" /></>}
                    </motion.button>
                  </form>

                  {bookingStatus === "success" && (
                    <motion.div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-2xl flex items-center shadow-xl"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <CheckCircle className="h-8 w-8 text-green-600 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-green-900 text-xl">Booking request received!</p>
                        <p className="text-green-700">We'll confirm your tour and pricing within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}
                  {bookingStatus === "error" && (
                    <motion.div className="mt-6 p-6 bg-red-50 border-2 border-red-300 rounded-2xl flex items-center shadow-xl"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <AlertCircle className="h-8 w-8 text-red-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-red-800 text-xl">Something went wrong</p>
                        <p className="text-red-600">Please try again or email us at iykemorrise@gmail.com</p>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>

            {/* RIGHT — Why Choose Us */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }} className="space-y-8">
              <div>
                <h2 className="text-5xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-green-600">
                  Why Choose Us?
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-green-500 mb-10 rounded-full shadow-lg" />
              </div>
              <div className="space-y-5">
                {[
                  { title: "24/7 Availability", description: "Our team is always ready to assist you, day or night. Book anytime, anywhere." },
                  { title: "Expert Local Guides", description: "Experienced Ghanaian guides who know every story, tradition, and hidden gem." },
                  { title: "Customized Tours", description: "Tailor-made experiences designed around your interests and schedule." },
                  { title: "Competitive Pricing", description: "Premium quality tours at affordable rates with transparent pricing." },
                  { title: "Safety First", description: "Full insurance coverage and adherence to the highest safety standards." },
                ].map((item, index) => (
                  <motion.div key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-amber-100 hover:border-yellow-400 flex gap-4 items-start"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }} whileHover={{ x: 8 }}>
                    <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl mb-1 font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-10 rounded-3xl text-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }} whileHover={{ scale: 1.02 }}>
                <Clock className="h-12 w-12 mb-6" />
                <h3 className="text-3xl mb-4 font-bold">Need Immediate Assistance?</h3>
                <p className="text-xl mb-6 text-white/90 leading-relaxed">Call us now for instant booking and tour information!</p>
                <a href="tel:+233200290770/+233557482133"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 hover:bg-gray-50 rounded-xl transition-all duration-300 font-bold text-xl shadow-xl group">
                  <Phone className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
                  +233200290770/+233557482133
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map */}
      <motion.div className="py-20 bg-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2 }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-green-600">
              Visit Our Office
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mb-10 rounded-full shadow-lg" />
            <p className="text-2xl text-gray-700">Located in the heart of Accra, Ghana</p>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-4 rounded-3xl shadow-2xl border-4 border-yellow-400">
            <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-20 w-20 text-amber-600 mx-auto mb-6" />
                <p className="text-2xl text-gray-700 font-bold mb-2">Ananse Heritage Tours</p>
                <p className="text-xl text-gray-600">Accra Central, Greater Accra Region</p>
                <p className="text-xl text-gray-600 mt-4">Ghana, West Africa</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
