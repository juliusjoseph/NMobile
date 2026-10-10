import { Ionicons } from "@expo/vector-icons";

// All prices, plans and routes below are sample data for the demo.
export const NETWORKS = [
  { id: "MTN", color: "#FFCC00" },
  { id: "Airtel", color: "#E40000" },
  { id: "9mobile", color: "#00A650" },
  { id: "Glo", color: "#50B651" },
];

export const AIRTIME_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export type Option = { id: string; label: string; detail: string; price: number };

export const DATA_PLANS: Option[] = [
  { id: "d1", label: "500 MB", detail: "Valid for 1 day", price: 150 },
  { id: "d2", label: "1 GB", detail: "Valid for 1 day", price: 300 },
  { id: "d3", label: "2 GB", detail: "Valid for 7 days", price: 600 },
  { id: "d4", label: "5 GB", detail: "Valid for 30 days", price: 1500 },
  { id: "d5", label: "10 GB", detail: "Valid for 30 days", price: 3000 },
];

export const TRIPS: Option[] = [
  { id: "t1", label: "City Centre to Airport", detail: "Express, about 35 min", price: 1200 },
  { id: "t2", label: "Central Station to Harbour", detail: "Standard, about 25 min", price: 800 },
  { id: "t3", label: "North Terminal to University", detail: "Standard, about 30 min", price: 600 },
];

export const BILLS: { id: string; label: string; icon: keyof typeof Ionicons.glyphMap; billers: string[]; field: string }[] = [
  { id: "power", label: "Electricity", icon: "flash", billers: ["Prepaid meter", "Postpaid meter"], field: "Meter number" },
  { id: "tv", label: "Cable TV", icon: "tv", billers: ["DStv", "GOtv", "StarTimes"], field: "Smartcard number" },
  { id: "water", label: "Water", icon: "water", billers: ["Water board"], field: "Customer ID" },
  { id: "net", label: "Internet", icon: "globe-outline", billers: ["Broadband", "Fibre"], field: "Account ID" },
];

export const NCOMMS = {
  broadband: {
    title: "Broadband services",
    blurb: "Fast home and office internet.",
    plans: [
      { id: "b1", label: "Home Lite", detail: "10 Mbps, unlimited, 30 days", price: 15000 },
      { id: "b2", label: "Home Plus", detail: "25 Mbps, unlimited, 30 days", price: 25000 },
      { id: "b3", label: "Business", detail: "50 Mbps, unlimited, 30 days", price: 45000 },
    ] as Option[],
  },
  wifi: {
    title: "Wifi services",
    blurb: "Stay online with a wifi pass.",
    plans: [
      { id: "w1", label: "Daily pass", detail: "24 hours, 1 device", price: 500 },
      { id: "w2", label: "Weekly pass", detail: "7 days, 1 device", price: 2500 },
      { id: "w3", label: "Monthly pass", detail: "30 days, 2 devices", price: 8000 },
    ] as Option[],
  },
};

export const COVERAGE = [
  { area: "Lagos", live: true },
  { area: "Ibadan", live: true },
  { area: "Abuja", live: true },
  { area: "Ile-Ife", live: false },
  { area: "Port Harcourt", live: false },
];
