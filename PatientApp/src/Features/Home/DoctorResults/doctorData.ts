export type Doctor = {
  name: string
  departments: string[]
  specialty: string
  experience: string
  fee: string
  image: string
}

export const doctors: Doctor[] = [
  { name: "Dr. Ananya Sharma", departments: ["General Checkup", "Cold & Flu"], specialty: "General Physician", experience: "12 years experience", fee: "₹600", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { name: "Dr. Rohan Mehta", departments: ["Viral Tests", "Allergy Relief"], specialty: "Internal Medicine", experience: "10 years experience", fee: "₹700", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80" },
  { name: "Dr. Kavita Nair", departments: ["ENT Care"], specialty: "ENT Specialist", experience: "14 years experience", fee: "₹800", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80" },
  { name: "Dr. Arjun Kapoor", departments: ["Heart Health"], specialty: "Cardiologist", experience: "16 years experience", fee: "₹1,000", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { name: "Dr. Meera Iyer", departments: ["Skin Care"], specialty: "Dermatologist", experience: "9 years experience", fee: "₹750", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80" },
  { name: "Dr. Vikram Singh", departments: ["Wellness Plan"], specialty: "Preventive Medicine", experience: "11 years experience", fee: "₹650", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { name: "Dr. Neelam Mohan", departments: ["General Checkup", "Wellness Plan"], specialty: "General Physician", experience: "15 years experience", fee: "₹750", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80" },
  { name: "Dr. Sameer Bhatia", departments: ["Heart Health", "General Checkup"], specialty: "Cardiologist", experience: "13 years experience", fee: "₹900", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80" },
]
