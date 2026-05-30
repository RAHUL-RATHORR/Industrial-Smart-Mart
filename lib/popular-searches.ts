export interface PopularSearchGroup {
  category: string;
  items: string[];
}

export const popularSearchGroups: PopularSearchGroup[] = [
  {
    category: "SAFETY",
    items: [
      "Safety Jackets",
      "Respiratory Masks",
      "Hearing Protection",
      "3M Safety Goggles",
      "Karam Safety Helmets",
      "Liberty Safety Shoes",
      "Venus Safety Masks",
    ],
  },
  {
    category: "POWER TOOLS",
    items: [
      "Makita Power Drills",
      "Power Tool Kits",
      "DeWalt Angle Grinders",
      "Cordless Power Tools",
      "Stanley Power Tools",
      "Bosch Power Tools",
    ],
  },
  {
    category: "LED & LIGHTING",
    items: [
      "LED Lights",
      "LED Bulbs",
      "Decorative Lights",
      "LED Flood Lights",
      "LED Batten Lights",
      "LED Panel Lights",
      "Crompton Lights",
      "Bajaj LED",
    ],
  },
  {
    category: "ELECTRICALS",
    items: [
      "Polycab Wires",
      "GM Switches",
      "Exide Batteries",
      "Anchor Switches",
      "Isolators",
      "MCB Distribution Boards",
      "Micro Drives",
    ],
  },
  {
    category: "OFFICE STATIONERY SUPPLIES",
    items: [
      "Laptop",
      "Toner Cartridges",
      "Shredders",
      "Lamination Machines",
      "Canon Printers",
      "Lenovo Laptops",
      "Casio Calculators",
      "JK Papers",
    ],
  },
  {
    category: "MEDICAL SUPPLIES",
    items: [
      "Body Weighing Scales",
      "First Aid & Wound Care",
      "Hot Water Bottles",
      "Thermometers",
      "Stethoscopes",
      "Flamingo Medical Supplies",
    ],
  },
  {
    category: "MEASUREMENT & TESTING",
    items: [
      "Oscilloscopes",
      "Pressure Gauges",
      "Alcohol Breath Analyzers",
      "Light Meters",
      "LCR Meters",
      "IR Thermometers",
      "Dial Indicators",
      "Anemometers",
    ],
  },
  {
    category: "OFFICE FURNITURE & DECOR",
    items: [
      "Office Chairs",
      "Office Décor",
      "Tables",
      "Stools",
      "Cello Chairs",
    ],
  },
  {
    category: "APPLIANCES & UTILITIES",
    items: [
      "Geysers",
      "Induction Cooktops",
      "Hand Blenders",
      "Electric Kettle",
      "Mixer Grinders",
      "Microwave Ovens",
      "Water Purifiers",
      "Wall Fans",
    ],
  },
  {
    category: "GARDENING, AGRICULTURE & LANDSCAPING",
    items: [
      "Chain Saws",
      "Lawn Mowers",
      "Brush Cutters",
      "Earth Augers",
      "Hedge Trimmers",
      "Sprayers",
      "Pruning Secateur",
      "Pots & Planters",
    ],
  },
  {
    category: "HAND TOOLS",
    items: [
      "Hand Tool Kits",
      "Pliers",
      "Wire Cutters",
      "Chisels",
      "Hacksaw Blades",
      "Socket Sets",
      "Machine Vices",
      "Taparia Hand Tools",
    ],
  },
  {
    category: "IT & ELECTRONICS",
    items: [
      "Mobile Phones",
      "Televisions",
      "Mobile Accessories",
      "Power Banks",
      "Tablets",
      "Intex",
      "Sandisk",
      "Logitech",
    ],
  },
  {
    category: "PLUMBING & BATHROOM FITTINGS",
    items: [
      "Faucets",
      "Pipes & Fittings",
      "Health Faucets",
      "Wash Basins",
      "Kitchen Sinks",
      "Floor Drains",
      "Diverters",
      "Towel Racks",
    ],
  },
  {
    category: "HARDWARE",
    items: [
      "Aldrops",
      "Locks",
      "Door Stoppers",
      "Door Handles",
      "Pad Locks",
      "Plaza Door Locks",
      "Godrej Locks",
      "Link Locks",
    ],
  },
  {
    category: "AUTOMOTIVE",
    items: [
      "Car Washers",
      "Helmets",
      "Bike Horns",
      "Shock Absorber",
      "Tail Lights",
      "Car Accessories",
      "Car Chargers",
      "Hydraulic Jacks",
    ],
  },
  {
    category: "SECURITY",
    items: [
      "Safes",
      "CCTV Cameras and Accessories",
      "Security Alarms",
      "GPS Trackers",
      "Hooters & Buzzers",
      "Sensors",
      "DVR",
      "Access Control System",
    ],
  },
  {
    category: "KITCHEN PANTRY AND SUPPLIES",
    items: [
      "Cutlery",
      "Cups & Mugs",
      "Pressure Cookers",
      "Bottles & Flasks",
      "Milton",
      "Wonderchef",
    ],
  },
  {
    category: "PUMPS & MOTORS",
    items: [
      "Control Motor Starters",
      "Booster Pumps",
      "Shallow Well Pumps",
      "Gear Pumps",
      "Kirloskar",
      "Sewage Pumps",
      "CRI Pumps",
    ],
  },
];

export const leftColumnGroups = popularSearchGroups.filter((_, i) => i % 2 === 0);
export const rightColumnGroups = popularSearchGroups.filter((_, i) => i % 2 === 1);
