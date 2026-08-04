import React, { useEffect, useMemo, useState } from "react"
import {
  Page,
  Container,
  TopBar,
  LocationInfo,
  MenuButton,
  LocationLabel,
  LocationValue,
  SearchSection,
  SearchControls,
  SearchCard,
  SearchIcon,
  SearchInput,
  SearchSuggestionButton,
  SearchSuggestionList,
  PageTitle,
  PageSubtitle,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAllButton,
  CardGrid,
  FeatureCard,
  FeatureIcon,
  FeatureLabel,
  FeatureDescription,
  FooterNote,
  ViewAllScreen,
  ViewAllHeader,
  BackButton,
  ViewAllTitle,
  ViewAllTabs,
  ViewAllTab,
  ViewAllContent,
  ViewAllCardGrid,
  ViewAllCard,
  ViewAllCardIcon,
  ViewAllCardLabel,
  ViewAllCardSubtitle,
  ViewAllSearchCard,
} from "./HomeStyle"
import DoctorResults from "./DoctorResults/DoctorResults"
import { doctors } from "./DoctorResults/doctorData"
import type { Doctor } from "./DoctorResults/doctorData"
import DoctorDetail from "./DoctorDetail/DoctorDetail"
import AppointmentBooking from "./AppointmentBooking/AppointmentBooking"
import SideDrawer from "./SideDrawer/SideDrawer"
import PaymentScreen from "./Payment/PaymentScreen"
import PaymentMethods from "./Payment/PaymentMethods"
import { paymentHistoryKey } from "./Payment/paymentData"

const sections = [
  {
    title: "Departments",
    items: [
      { label: "General Checkup", description: "Routine health review", icon: "🩺" },
      { label: "Viral Tests", description: "Fast diagnosis", icon: "🧬" },
      { label: "ENT Care", description: "Nose, ear & throat", icon: "👃" },
      { label: "Heart Health", description: "Cardio monitoring", icon: "❤️" },
    ],
  },
  {
    title: "Speciality Care",
    items: [
      { label: "Cold & Flu", description: "Seasonal support", icon: "🤧" },
      { label: "Allergy Relief", description: "Quick comfort", icon: "🌿" },
      { label: "Skin Care", description: "Sensitive treatment", icon: "🧴" },
      { label: "Wellness Plan", description: "Preventive care", icon: "📋" },
    ],
  },
]

const topCareItems = [
  { label: "Heart attack", category: "Heart", icon: "🩸", subtitle: "Emergency response" },
  { label: "Heart Failure", category: "Heart", icon: "❤️‍🩹", subtitle: "Chronic support" },
  { label: "Angina", category: "Heart", icon: "💓", subtitle: "Chest discomfort" },
  { label: "High BP", category: "Heart", icon: "📈", subtitle: "Blood pressure care" },
  { label: "Liver cleanse", category: "Liver", icon: "🧪", subtitle: "Detox plans" },
  { label: "Kidney stones", category: "Kidney", icon: "🪨", subtitle: "Mineral management" },
  { label: "Stomach pain", category: "Stomach", icon: "🤢", subtitle: "Digestive relief" },
  { label: "Brain fog", category: "Brain", icon: "🧠", subtitle: "Cognitive wellness" },
  { label: "Lung check", category: "Lung", icon: "🌬️", subtitle: "Respiratory screening" },
  { label: "Eye care", category: "Eye", icon: "👁️", subtitle: "Vision diagnostics" },
  { label: "Liver function", category: "Liver", icon: "🩸", subtitle: "Function testing" },
  { label: "Kidney health", category: "Kidney", icon: "💧", subtitle: "Hydration care" },
]

const categoryTabs = ["All", "Heart", "Liver", "Kidney", "Stomach", "Brain", "Lung", "Eye"]

type HomeProps = {
  onSignOut?: () => void
}

const Home = ({ onSignOut }: HomeProps) => {
  const [viewAllOpen, setViewAllOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [doctorResultsOpen, setDoctorResultsOpen] = useState(false)
  const [doctorSearch, setDoctorSearch] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | undefined>()
  const [paymentDetails, setPaymentDetails] = useState<{ doctor: Doctor; date: string; slot: string } | undefined>()
  const [paymentMethodsOpen, setPaymentMethodsOpen] = useState(false)
  const [doctorSearchInput, setDoctorSearchInput] = useState("")
  const [debouncedDoctorSearch, setDebouncedDoctorSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTopCareItems = useMemo(
    () =>
      topCareItems.filter((item) => {
        const matchCategory = activeCategory === "All" || item.category === activeCategory
        const matchSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase())
        return matchCategory && matchSearch
      }),
    [activeCategory, searchTerm]
  )

  const openViewAll = () => {
    setActiveCategory("All")
    setSearchTerm("")
    setViewAllOpen(true)
  }

  const closeViewAll = () => {
    setViewAllOpen(false)
  }

  const openDrawer = () => {
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const rememberPaymentMethod = (methodId: string) => {
    try {
      const savedMethods: string[] = JSON.parse(window.localStorage.getItem(paymentHistoryKey) || "[]")
      window.localStorage.setItem(paymentHistoryKey, JSON.stringify([methodId, ...savedMethods.filter((id) => id !== methodId)]))
    } catch {
      // Payment completion should still work if browser storage is unavailable.
    }
  }

  const openDoctorResults = (department?: string, doctorName = "") => {
    setSelectedDepartment(department)
    setDoctorSearch(doctorName)
    setSelectedDoctor(undefined)
    setDoctorResultsOpen(true)
  }

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      setDebouncedDoctorSearch(doctorSearchInput)
      // Replace this state update with the doctor-search API request when the API is available.
    }, 5000)

    return () => window.clearTimeout(debounceTimer)
  }, [doctorSearchInput])

  const doctorSuggestions = useMemo(
    () =>
      doctorSearchInput
        ? doctors.filter((doctor) => doctor.name.toLowerCase().includes(doctorSearchInput.toLowerCase())).slice(0, 5)
        : [],
    [doctorSearchInput]
  )

  if (doctorResultsOpen) {
    if (paymentDetails) {
      return <PaymentScreen doctor={paymentDetails.doctor} date={paymentDetails.date} slot={paymentDetails.slot} onBack={() => setPaymentDetails(undefined)} onComplete={rememberPaymentMethod} onDone={() => { setPaymentDetails(undefined); setBookingDoctor(undefined); setSelectedDoctor(undefined) }} />
    }
    if (bookingDoctor) {
      return <AppointmentBooking doctor={bookingDoctor} onBack={() => setBookingDoctor(undefined)} onProceedToPayment={(date, slot) => setPaymentDetails({ doctor: bookingDoctor, date, slot })} />
    }

    if (selectedDoctor) {
      return (
        <DoctorDetail
          doctor={selectedDoctor}
          onBack={() => setSelectedDoctor(undefined)}
          onSelectDoctor={setSelectedDoctor}
          onBookAppointment={setBookingDoctor}
        />
      )
    }

    return (
      <DoctorResults
        department={selectedDepartment}
        initialSearch={doctorSearch}
        onBack={() => setDoctorResultsOpen(false)}
        onSelectDoctor={setSelectedDoctor}
      />
    )
  }

  if (paymentMethodsOpen) {
    return <PaymentMethods onBack={() => setPaymentMethodsOpen(false)} />
  }

  if (viewAllOpen) {
    return (
      <Page>
        <ViewAllScreen>
          <Container>
            <ViewAllHeader>
              <BackButton type="button" onClick={closeViewAll} aria-label="Go back">
                ←
              </BackButton>
              <ViewAllTitle>Top Care</ViewAllTitle>
            </ViewAllHeader>

            <ViewAllSearchCard>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search care categories"
              />
            </ViewAllSearchCard>

            <ViewAllTabs>
              {categoryTabs.map((tab) => (
                <ViewAllTab
                  key={tab}
                  type="button"
                  $active={activeCategory === tab}
                  onClick={() => setActiveCategory(tab)}
                >
                  {tab}
                </ViewAllTab>
              ))}
            </ViewAllTabs>

            <ViewAllContent>
              <ViewAllCardGrid>
                {filteredTopCareItems.map((item) => (
                  <ViewAllCard key={item.label}>
                    <ViewAllCardIcon>{item.icon}</ViewAllCardIcon>
                    <ViewAllCardLabel>{item.label}</ViewAllCardLabel>
                    <ViewAllCardSubtitle>{item.subtitle}</ViewAllCardSubtitle>
                  </ViewAllCard>
                ))}
              </ViewAllCardGrid>
            </ViewAllContent>
          </Container>
        </ViewAllScreen>
      </Page>
    )
  }

  return (
    <Page>
      {drawerOpen && <SideDrawer onClose={closeDrawer} onSignOut={onSignOut} onPaymentMethods={() => setPaymentMethodsOpen(true)} />}
      <Container>
        <TopBar>
          <LocationInfo onClick={openDrawer}>
            <MenuButton aria-label="Open menu">☰</MenuButton>
            <div>
              <LocationLabel>Location</LocationLabel>
              <LocationValue>Sector 47, Gurgaon ▾</LocationValue>
            </div>
          </LocationInfo>
        </TopBar>

        <SearchSection>
          <div>
            <PageTitle>Care from doctors you trust</PageTitle>
            <PageSubtitle>Search for a doctor by name or choose a department to book your consultation.</PageSubtitle>
          </div>
          <SearchControls>
            <SearchCard>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                value={doctorSearchInput}
                placeholder="Search by doctor name"
                onChange={(event) => setDoctorSearchInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") openDoctorResults(undefined, doctorSearchInput)
                }}
              />
              {doctorSearchInput && (
                <SearchSuggestionList aria-label="Doctor suggestions" data-api-query={debouncedDoctorSearch}>
                  {doctorSuggestions.map((doctor) => (
                    <li key={doctor.name}>
                      <SearchSuggestionButton type="button" onClick={() => openDoctorResults(undefined, doctor.name)}>
                        <strong>{doctor.name}</strong>
                        <span>{doctor.specialty}</span>
                      </SearchSuggestionButton>
                    </li>
                  ))}
                  {!doctorSuggestions.length && <li>No doctor found with this name.</li>}
                </SearchSuggestionList>
              )}
            </SearchCard>
          </SearchControls>
        </SearchSection>

        {sections.map((section) => (
          <Section key={section.title}>
            <SectionHeader>
              <SectionTitle>{section.title}</SectionTitle>
              <ViewAllButton type="button" onClick={openViewAll}>
                View all
              </ViewAllButton>
            </SectionHeader>
            <CardGrid>
              {section.items.map((item) => (
                <FeatureCard key={item.label} type="button" onClick={() => openDoctorResults(item.label)}>
                  <FeatureIcon>{item.icon}</FeatureIcon>
                  <FeatureLabel>{item.label}</FeatureLabel>
                  <FeatureDescription>{item.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </CardGrid>
          </Section>
        ))}

        <FooterNote>Browse featured care categories for fast access to services and appointments.</FooterNote>
      </Container>
    </Page>
  )
}

export default Home
