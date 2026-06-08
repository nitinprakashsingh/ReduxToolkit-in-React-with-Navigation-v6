import React, { useMemo, useState } from "react"
import {
  Page,
  Container,
  TopBar,
  LocationInfo,
  MenuButton,
  LocationLabel,
  LocationValue,
  SearchSection,
  SearchRow,
  SearchCard,
  SearchIcon,
  SearchInput,
  SearchAction,
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
  OverlayBackdrop,
  FilterModal,
  FilterHeader,
  FilterTitle,
  CloseButton,
  FilterSection,
  FilterSectionTitle,
  FilterChipsRow,
  FilterChip,
  FilterSearchCard,
  FilterSliderRow,
  FilterSliderLabel,
  ApplyButton,
} from "./HomeStyle"

const sections = [
  {
    title: "Common Care",
    items: [
      { label: "General Checkup", description: "Routine health review", icon: "🩺" },
      { label: "Viral Tests", description: "Fast diagnosis", icon: "🧬" },
      { label: "ENT Care", description: "Nose, ear & throat", icon: "👃" },
      { label: "Heart Health", description: "Cardio monitoring", icon: "❤️" },
    ],
  },
  {
    title: "Seasonal Care",
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

const Home = () => {
  const [viewAllOpen, setViewAllOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSearch, setFilterSearch] = useState("")
  const [selectedConsultancy, setSelectedConsultancy] = useState("")
  const [selectedBed, setSelectedBed] = useState("")
  const [selectedPmjay, setSelectedPmjay] = useState("")
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedServiceType, setSelectedServiceType] = useState("All")
  const [wellnessCentre, setWellnessCentre] = useState(true)
  const [yogaCentre, setYogaCentre] = useState(false)
  const [distance, setDistance] = useState(15)

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

  const openFilter = () => {
    setFilterOpen(true)
  }

  const closeFilter = () => {
    setFilterOpen(false)
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
      {filterOpen && (
        <OverlayBackdrop onClick={closeFilter}>
          <FilterModal onClick={(event) => event.stopPropagation()}>
            <FilterHeader>
              <FilterTitle>Filter hospitals</FilterTitle>
              <CloseButton type="button" onClick={closeFilter} aria-label="Close filter">
                ×
              </CloseButton>
            </FilterHeader>

            <FilterSearchCard>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                placeholder="Search by hospital"
                value={filterSearch}
                onChange={(event) => setFilterSearch(event.target.value)}
              />
            </FilterSearchCard>

            <FilterSection>
              <FilterSectionTitle>Consultancy charges</FilterSectionTitle>
              <FilterChipsRow>
                {['₹50-₹200', '₹200-₹500', '₹500-Above'].map((option) => (
                  <FilterChip
                    key={option}
                    type="button"
                    $active={selectedConsultancy === option}
                    onClick={() => setSelectedConsultancy(option)}
                  >
                    {option}
                  </FilterChip>
                ))}
              </FilterChipsRow>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle>Bed charges (per day)</FilterSectionTitle>
              <FilterChipsRow>
                {['₹500-₹1000', '₹1000-₹2000', '₹2000-Above'].map((option) => (
                  <FilterChip
                    key={option}
                    type="button"
                    $active={selectedBed === option}
                    onClick={() => setSelectedBed(option)}
                  >
                    {option}
                  </FilterChip>
                ))}
              </FilterChipsRow>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle>PM-jay</FilterSectionTitle>
              <FilterChipsRow>
                {['Yes', 'No'].map((option) => (
                  <FilterChip
                    key={option}
                    type="button"
                    $active={selectedPmjay === option}
                    onClick={() => setSelectedPmjay(option)}
                  >
                    {option}
                  </FilterChip>
                ))}
              </FilterChipsRow>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle>Ratings</FilterSectionTitle>
              <FilterChipsRow>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FilterChip
                    key={rating}
                    type="button"
                    $active={selectedRating === rating}
                    onClick={() => setSelectedRating(rating)}
                  >
                    {rating} ★
                  </FilterChip>
                ))}
              </FilterChipsRow>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle>Service type</FilterSectionTitle>
              <FilterChipsRow>
                {['All', 'Hospital', 'Clinic'].map((option) => (
                  <FilterChip
                    key={option}
                    type="button"
                    $active={selectedServiceType === option}
                    onClick={() => setSelectedServiceType(option)}
                  >
                    {option}
                  </FilterChip>
                ))}
              </FilterChipsRow>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle>Centres</FilterSectionTitle>
              <FilterChipsRow>
                <FilterChip
                  type="button"
                  $active={wellnessCentre}
                  onClick={() => setWellnessCentre((value) => !value)}
                >
                  Wellness centre
                </FilterChip>
                <FilterChip
                  type="button"
                  $active={yogaCentre}
                  onClick={() => setYogaCentre((value) => !value)}
                >
                  Yoga centre
                </FilterChip>
              </FilterChipsRow>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle>Distance</FilterSectionTitle>
              <FilterSliderRow>
                <FilterSliderLabel>
                  <span>0 KM</span>
                  <span>{distance} KM</span>
                  <span>50 KM</span>
                </FilterSliderLabel>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={distance}
                  onChange={(event) => setDistance(Number(event.target.value))}
                />
              </FilterSliderRow>
            </FilterSection>

            <ApplyButton type="button" onClick={closeFilter}>
              Apply
            </ApplyButton>
          </FilterModal>
        </OverlayBackdrop>
      )}
      <Container>
        <TopBar>
          <LocationInfo>
            <MenuButton aria-label="Open menu">☰</MenuButton>
            <div>
              <LocationLabel>Location</LocationLabel>
              <LocationValue>Sector 47, Gurgaon ▾</LocationValue>
            </div>
          </LocationInfo>
        </TopBar>

        <SearchSection>
          <div>
            <PageTitle>Find care near you</PageTitle>
            <PageSubtitle>Search hospitals, doctors, and health services in your area.</PageSubtitle>
          </div>
          <SearchRow>
            <SearchCard onClick={openFilter} role="button" tabIndex={0}>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                placeholder="Search by hospital"
                value={filterSearch}
                readOnly
                onFocus={openFilter}
              />
            </SearchCard>
            <SearchAction type="button" aria-label="Open filters" onClick={openFilter}>
              Filter
            </SearchAction>
          </SearchRow>
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
                <FeatureCard key={item.label}>
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
