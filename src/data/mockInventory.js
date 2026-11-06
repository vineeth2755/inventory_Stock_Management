export const INITIAL_INVENTORY = [
  {
    id: "INV-1001",
    name: "Industrial Air Filter AF-90",
    category: "Consumables",
    description: "Heavy-duty particulate air filter for HVAC and ventilation units.",
    location: "Warehouse A - Bay 12",
    warehouse: "Warehouse A",
    zone: "Bay 12",
    availableQty: 18,
    reservedQty: 4,
    reorderLevel: 20,
    unit: "Units",
    supplier: "AeroPure Filtration Ltd.",
    lastUpdated: "2026-10-18",
    status: "Low Stock",
    image: null,
    movements: [
      { id: "MOV-501", type: "Dispatch", quantity: -6, date: "2026-10-18", user: "Vikram S.", notes: "Shipped to Assembly Line 2" },
      { id: "MOV-498", type: "Receipt", quantity: 15, date: "2026-10-10", user: "Rajesh K.", notes: "Restock PO #8832" },
    ]
  },
  {
    id: "INV-1002",
    name: "Precision Hydraulic Valve HV-4",
    category: "Components",
    description: "High-pressure rated hydraulic valve for robotic press systems.",
    location: "Warehouse B - Shelf 04",
    warehouse: "Warehouse B",
    zone: "Shelf 04",
    availableQty: 85,
    reservedQty: 10,
    reorderLevel: 25,
    unit: "Units",
    supplier: "FluidDynamics Corp",
    lastUpdated: "2026-10-22",
    status: "In Stock",
    image: null,
    movements: [
      { id: "MOV-512", type: "Dispatch", quantity: -2, date: "2026-10-22", user: "Ananya M.", notes: "Maintenance spare request" },
      { id: "MOV-480", type: "Receipt", quantity: 50, date: "2026-09-30", user: "Vikram S.", notes: "Quarterly batch intake" }
    ]
  },
  {
    id: "INV-1003",
    name: "Lithium-Ion Pack 48V 20Ah",
    category: "Electrical",
    description: "Rechargeable high-cycle battery module for automated guided vehicles.",
    location: "Cold Storage - Sec C",
    warehouse: "Cold Storage",
    zone: "Section C",
    availableQty: 0,
    reservedQty: 0,
    reorderLevel: 15,
    unit: "Packs",
    supplier: "VoltMax Power Systems",
    lastUpdated: "2026-10-24",
    status: "Out of Stock",
    image: null,
    movements: [
      { id: "MOV-520", type: "Dispatch", quantity: -5, date: "2026-10-24", user: "Rajesh K.", notes: "Depleted for fleet overhaul" },
      { id: "MOV-505", type: "Audit", quantity: 0, date: "2026-10-19", user: "Vikram S.", notes: "Stock count confirmed zero" }
    ]
  },
  {
    id: "INV-1004",
    name: "Synthetic Gear Lubricant 5L",
    category: "Consumables",
    description: "ISO VG 220 industrial synthetic gear oil with anti-wear additives.",
    location: "Warehouse A - Bay 02",
    warehouse: "Warehouse A",
    zone: "Bay 02",
    availableQty: 12,
    reservedQty: 2,
    reorderLevel: 30,
    unit: "Cans",
    supplier: "PetroChem Solutions",
    lastUpdated: "2026-10-25",
    status: "Low Stock",
    image: null,
    movements: [
      { id: "MOV-524", type: "Dispatch", quantity: -8, date: "2026-10-25", user: "Ananya M.", notes: "Monthly machine lubrication" }
    ]
  },
  {
    id: "INV-1005",
    name: "CNC Carbide End Mill 12mm",
    category: "Machinery & Tools",
    description: "4-flute solid carbide milling cutter for stainless steel machining.",
    location: "Warehouse B - Tool Crib",
    warehouse: "Warehouse B",
    zone: "Tool Crib",
    availableQty: 140,
    reservedQty: 15,
    reorderLevel: 40,
    unit: "Units",
    supplier: "Optima Cutting Tools",
    lastUpdated: "2026-10-21",
    status: "In Stock",
    image: null,
    movements: [
      { id: "MOV-510", type: "Receipt", quantity: 100, date: "2026-10-21", user: "Vikram S.", notes: "Standard PO receipt" }
    ]
  },
  {
    id: "INV-1006",
    name: "Silicone Thermal Paste 100g",
    category: "Electrical",
    description: "High thermal conductivity paste for heatsinks and power electronics.",
    location: "Warehouse A - Bay 09",
    warehouse: "Warehouse A",
    zone: "Bay 09",
    availableQty: 5,
    reservedQty: 0,
    reorderLevel: 25,
    unit: "Tubes",
    supplier: "ThermalTech Global",
    lastUpdated: "2026-10-26",
    status: "Low Stock",
    image: null,
    movements: [
      { id: "MOV-528", type: "Dispatch", quantity: -10, date: "2026-10-26", user: "Rajesh K.", notes: "Electronics sub-assembly run" }
    ]
  },
  {
    id: "INV-1007",
    name: "Heavy Duty Conveyor Belt 50m",
    category: "Machinery & Tools",
    description: "Reinforced 3-ply rubber conveyor belt roll, 600mm width.",
    location: "Warehouse B - Heavy Yard",
    warehouse: "Warehouse B",
    zone: "Heavy Yard",
    availableQty: 0,
    reservedQty: 0,
    reorderLevel: 4,
    unit: "Rolls",
    supplier: "Apex Belting Industries",
    lastUpdated: "2026-10-15",
    status: "Out of Stock",
    image: null,
    movements: [
      { id: "MOV-490", type: "Dispatch", quantity: -2, date: "2026-10-15", user: "Ananya M.", notes: "Installed on Sorting Line 1" }
    ]
  },
  {
    id: "INV-1008",
    name: "Digital Caliper 150mm IP67",
    category: "Machinery & Tools",
    description: "Stainless steel digital vernier caliper with coolant resistance.",
    location: "Warehouse B - Tool Crib",
    warehouse: "Warehouse B",
    zone: "Tool Crib",
    availableQty: 22,
    reservedQty: 1,
    reorderLevel: 10,
    unit: "Units",
    supplier: "PrecisionMetrics Co.",
    lastUpdated: "2026-10-17",
    status: "In Stock",
    image: null,
    movements: [
      { id: "MOV-495", type: "Receipt", quantity: 10, date: "2026-10-17", user: "Vikram S.", notes: "Calibration lab replenishment" }
    ]
  },
  {
    id: "INV-1009",
    name: "Polycarbonate Safety Shield",
    category: "Safety & PPE",
    description: "Full face anti-fog impact resistant protective visor.",
    location: "Warehouse A - Safety Rack",
    warehouse: "Warehouse A",
    zone: "Safety Rack",
    availableQty: 64,
    reservedQty: 8,
    reorderLevel: 30,
    unit: "Pieces",
    supplier: "SafeGuard Industrial",
    lastUpdated: "2026-10-23",
    status: "In Stock",
    image: null,
    movements: [
      { id: "MOV-515", type: "Receipt", quantity: 40, date: "2026-10-23", user: "Rajesh K.", notes: "Safety audit compliance restock" }
    ]
  },
  {
    id: "INV-1010",
    name: "Nitrile Gloves Powder-Free (L)",
    category: "Safety & PPE",
    description: "Box of 100 chemical-resistant heavy-duty disposable nitrile gloves.",
    location: "Warehouse A - Safety Rack",
    warehouse: "Warehouse A",
    zone: "Safety Rack",
    availableQty: 18,
    reservedQty: 5,
    reorderLevel: 50,
    unit: "Boxes",
    supplier: "SafeGuard Industrial",
    lastUpdated: "2026-10-26",
    status: "Low Stock",
    image: null,
    movements: [
      { id: "MOV-530", type: "Dispatch", quantity: -20, date: "2026-10-26", user: "Ananya M.", notes: "Distributed to packaging lines" }
    ]
  },
  {
    id: "INV-1011",
    name: "Linear Stepper Motor NEMA 23",
    category: "Components",
    description: "High torque bipolar stepper motor with integrated lead screw.",
    location: "Warehouse B - Shelf 02",
    warehouse: "Warehouse B",
    zone: "Shelf 02",
    availableQty: 42,
    reservedQty: 6,
    reorderLevel: 20,
    unit: "Units",
    supplier: "MotionWorks Automation",
    lastUpdated: "2026-10-19",
    status: "In Stock",
    image: null,
    movements: [
      { id: "MOV-502", type: "Receipt", quantity: 20, date: "2026-10-19", user: "Vikram S.", notes: "New production line allocation" }
    ]
  },
  {
    id: "INV-1012",
    name: "Ceramic Insulator Bushing",
    category: "Electrical",
    description: "High voltage outdoor substation porcelain insulator unit.",
    location: "Cold Storage - Sec A",
    warehouse: "Cold Storage",
    zone: "Section A",
    availableQty: 7,
    reservedQty: 0,
    reorderLevel: 15,
    unit: "Units",
    supplier: "ElectroGrid Parts Ltd.",
    lastUpdated: "2026-10-20",
    status: "Low Stock",
    image: null,
    movements: [
      { id: "MOV-508", type: "Dispatch", quantity: -3, date: "2026-10-20", user: "Rajesh K.", notes: "Substation 3 scheduled maintenance" }
    ]
  }
];

export const CATEGORIES = [
  "Consumables",
  "Components",
  "Electrical",
  "Machinery & Tools",
  "Safety & PPE"
];

export const WAREHOUSES = [
  "Warehouse A",
  "Warehouse B",
  "Cold Storage"
];

