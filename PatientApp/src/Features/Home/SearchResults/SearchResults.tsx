import React, { useMemo, useState } from "react"
import {
  ResultBackButton,
  ResultBookButton,
  ResultCard,
  ResultCardDetails,
  ResultCardImage,
  ResultDistance,
  ResultFilterButton,
  ResultHeader,
  ResultHeaderContent,
  ResultHeaderTitle,
  ResultList,
  ResultMeta,
  ResultMetaValue,
  ResultRating,
  ResultSearchBox,
  ResultSearchInput,
  ResultSearchRow,
  ResultSection,
  ResultSummary,
} from "../HomeStyle"

const hospitals = [
  { name: "Medanta The Medicity", distance: 3, timing: "10AM - 11PM", bedCharge: "₹1500/Day", rating: "4.8", reviews: 60 },
  { name: "Artemis Hospital", distance: 4, timing: "24 Hours", bedCharge: "₹1800/Day", rating: "4.7", reviews: 48 },
  { name: "Fortis Memorial Research Institute", distance: 6, timing: "24 Hours", bedCharge: "₹2200/Day", rating: "4.6", reviews: 75 },
  { name: "Paras Hospital", distance: 8, timing: "9AM - 10PM", bedCharge: "₹1300/Day", rating: "4.5", reviews: 42 },
]

type SearchResultsProps = {
  query: string
  distance: number
  onBack: () => void
  onFilter: () => void
}

const SearchResults = ({ query, distance, onBack, onFilter }: SearchResultsProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const visibleHospitals = useMemo(
    () =>
      hospitals.filter(
        (hospital) =>
          hospital.distance <= distance && hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [distance, searchTerm]
  )

  return (
    <ResultSection>
      <ResultHeader>
        <ResultHeaderContent>
          <ResultBackButton type="button" onClick={onBack} aria-label="Back to home">
            ←
          </ResultBackButton>
          <ResultHeaderTitle>Search hospitals</ResultHeaderTitle>
          <ResultSearchRow>
            <ResultSearchBox>
              <span aria-hidden="true">⌕</span>
              <ResultSearchInput
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by hospital"
                aria-label="Search hospitals"
              />
            </ResultSearchBox>
            <ResultFilterButton type="button" onClick={onFilter}>
              ☷ Filter
            </ResultFilterButton>
          </ResultSearchRow>
        </ResultHeaderContent>
      </ResultHeader>

      <ResultList>
        <ResultSummary>
          Results for <strong>“{searchTerm || query}”</strong> <span>within {distance} KM</span>
        </ResultSummary>

        {visibleHospitals.map((hospital) => (
          <ResultCard key={hospital.name}>
            <ResultCardImage
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=700&q=80"
              alt="Hospital corridor"
            />
            <ResultCardDetails>
              <h2>{hospital.name}</h2>
              <ResultDistance>● {hospital.distance} KM from your location</ResultDistance>
              <ResultMeta>
                <div>
                  <span>Timing</span>
                  <ResultMetaValue>{hospital.timing}</ResultMetaValue>
                </div>
                <div>
                  <span>Bed charges</span>
                  <ResultMetaValue>{hospital.bedCharge}</ResultMetaValue>
                </div>
              </ResultMeta>
              <ResultRating>{hospital.rating} ★</ResultRating> <strong>{hospital.reviews} Reviews</strong>
              <ResultBookButton type="button">Book Now</ResultBookButton>
            </ResultCardDetails>
          </ResultCard>
        ))}

        {visibleHospitals.length === 0 && <ResultSummary>No hospitals found in this distance.</ResultSummary>}
      </ResultList>
    </ResultSection>
  )
}

export default SearchResults
