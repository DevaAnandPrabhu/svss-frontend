export const VEHICLES = [
  { id: 1, name: "Toyota Camry",    plate: "TN-01-AB-1234", type: "Sedan",      year: 2021, color: "Silver", owner: "Rajesh Kumar",  ownerPhone: "+91 98765 43210", status: "active",  mileage: 42000, lastService: "2024-11-15", icon: "🚗" },
  { id: 2, name: "Honda City",      plate: "TN-01-CD-5678", type: "Sedan",      year: 2020, color: "White",  owner: "Priya Sharma",  ownerPhone: "+91 87654 32109", status: "active",  mileage: 58000, lastService: "2025-01-20", icon: "🚗" },
  { id: 3, name: "Mahindra Thar",   plate: "TN-02-EF-9012", type: "SUV",        year: 2022, color: "Red",    owner: "Arjun Nair",    ownerPhone: "+91 76543 21098", status: "service", mileage: 28000, lastService: "2025-02-10", icon: "🚙" },
  { id: 4, name: "Royal Enfield",   plate: "TN-03-GH-3456", type: "Motorcycle", year: 2023, color: "Black",  owner: "Divya Menon",   ownerPhone: "+91 65432 10987", status: "active",  mileage: 12000, lastService: "2025-01-05", icon: "🏍️" },
  { id: 5, name: "Tata Nexon EV",   plate: "TN-04-IJ-7890", type: "EV SUV",     year: 2023, color: "Blue",   owner: "Suresh Babu",   ownerPhone: "+91 54321 09876", status: "pending", mileage: 33000, lastService: "2024-12-28", icon: "⚡" },
  { id: 6, name: "Maruti Swift",    plate: "TN-05-KL-2345", type: "Hatchback",  year: 2019, color: "Grey",   owner: "Lakshmi Devi",  ownerPhone: "+91 43210 98765", status: "active",  mileage: 71000, lastService: "2025-02-18", icon: "🚘" },
];

export const APPOINTMENTS = [
  { id: 101, vehicleId: 1, vehicle: "Toyota Camry",   plate: "TN-01-AB-1234", service: "Full Service",       date: "2025-03-10", time: "09:00 AM", technician: "Murugan K.", status: "pending",   cost: 4500,  notes: "Customer requests wheel alignment too" },
  { id: 102, vehicleId: 3, vehicle: "Mahindra Thar",  plate: "TN-02-EF-9012", service: "Engine Overhaul",    date: "2025-03-05", time: "11:00 AM", technician: "Selvam R.",  status: "active",    cost: 18000, notes: "Noise from engine block" },
  { id: 103, vehicleId: 2, vehicle: "Honda City",     plate: "TN-01-CD-5678", service: "Oil Change",         date: "2025-02-28", time: "02:00 PM", technician: "Vijay P.",   status: "completed", cost: 1200,  notes: "" },
  { id: 104, vehicleId: 5, vehicle: "Tata Nexon EV",  plate: "TN-04-IJ-7890", service: "Battery Inspection", date: "2025-03-12", time: "10:30 AM", technician: "Rajan M.",   status: "pending",   cost: 2800,  notes: "Range reduced by 20%" },
  { id: 105, vehicleId: 4, vehicle: "Royal Enfield",  plate: "TN-03-GH-3456", service: "Brake Service",      date: "2025-02-20", time: "03:00 PM", technician: "Kumar S.",   status: "completed", cost: 950,   notes: "" },
  { id: 106, vehicleId: 6, vehicle: "Maruti Swift",   plate: "TN-05-KL-2345", service: "AC Repair",          date: "2025-03-15", time: "01:00 PM", technician: "Murugan K.", status: "pending",   cost: 3200,  notes: "AC not cooling" },
];

export const SERVICES = [
  { id: 1, name: "Oil Change",          duration: "45 min",  price: 1200,  category: "Maintenance" },
  { id: 2, name: "Full Service",        duration: "4 hrs",   price: 4500,  category: "Maintenance" },
  { id: 3, name: "Brake Service",       duration: "2 hrs",   price: 2500,  category: "Repair" },
  { id: 4, name: "AC Repair",           duration: "3 hrs",   price: 3500,  category: "Repair" },
  { id: 5, name: "Engine Overhaul",     duration: "8 hrs",   price: 18000, category: "Major Repair" },
  { id: 6, name: "Battery Inspection",  duration: "1 hr",    price: 800,   category: "Inspection" },
  { id: 7, name: "Wheel Alignment",     duration: "1.5 hrs", price: 1500,  category: "Maintenance" },
  { id: 8, name: "Tyre Rotation",       duration: "30 min",  price: 600,   category: "Maintenance" },
];

export const TECHNICIANS = [
  "Murugan K.",
  "Selvam R.",
  "Vijay P.",
  "Rajan M.",
  "Kumar S.",
  "Anbu T.",
];

export const VEHICLE_TYPES = ["Sedan", "SUV", "Hatchback", "Motorcycle", "EV SUV", "Truck", "Van"];

export const VEHICLE_ICONS = {
  Sedan:      "🚗",
  SUV:        "🚙",
  Hatchback:  "🚘",
  Motorcycle: "🏍️",
  "EV SUV":   "⚡",
  Truck:      "🚛",
  Van:        "🚐",
};
