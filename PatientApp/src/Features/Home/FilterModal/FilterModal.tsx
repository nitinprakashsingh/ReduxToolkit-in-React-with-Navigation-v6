import React, { useState } from "react"
import {
  ApplyFilterButton,
  FilterDistanceLabels,
  FilterDivider,
  FilterModal as FilterModalPanel,
  FilterNotch,
  FilterOptionButton,
  FilterOptions,
  FilterOverlay,
  FilterPanelSection,
  FilterPanelTitle,
  FilterRadioMark,
  FilterRadioOption,
} from "../HomeStyle"

const consultancyCharges = ["Rs 50-Rs 200", "Rs 200-Rs 500", "Rs 500-Above"]
const bedCharges = ["Rs 500-Rs 1000", "Rs 1000-Rs 2000", "Rs 2000-Above"]
const serviceTypes = ["All", "Hospital", "Clinic"]
const centreTypes = ["Wellness centre", "Yoga centre"]

type FilterModalProps = {
  onClose: () => void
}

const FilterModal = ({ onClose }: FilterModalProps) => {
  const [selectedConsultancy, setSelectedConsultancy] = useState(consultancyCharges[1])
  const [selectedBedCharge, setSelectedBedCharge] = useState(bedCharges[1])
  const [pmjayEnabled, setPmjayEnabled] = useState(true)
  const [selectedServiceType, setSelectedServiceType] = useState("All")
  const [selectedCentres, setSelectedCentres] = useState<string[]>(["Wellness centre"])

  const toggleCentre = (centre: string) => {
    setSelectedCentres((currentCentres) =>
      currentCentres.includes(centre)
        ? currentCentres.filter((currentCentre) => currentCentre !== centre)
        : [...currentCentres, centre]
    )
  }

  return (
    <FilterOverlay onClick={onClose}>
      <FilterModalPanel onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Filters">
        <FilterNotch />

        <FilterPanelSection>
          <FilterPanelTitle>Consultancy charges</FilterPanelTitle>
          <FilterOptions>
            {consultancyCharges.map((charge) => (
              <FilterOptionButton
                key={charge}
                type="button"
                $active={selectedConsultancy === charge}
                onClick={() => setSelectedConsultancy(charge)}
              >
                {charge}
              </FilterOptionButton>
            ))}
          </FilterOptions>
        </FilterPanelSection>

        <FilterPanelSection>
          <FilterPanelTitle>Bed charges (per day)</FilterPanelTitle>
          <FilterOptions>
            {bedCharges.map((charge) => (
              <FilterOptionButton
                key={charge}
                type="button"
                $active={selectedBedCharge === charge}
                onClick={() => setSelectedBedCharge(charge)}
              >
                {charge}
              </FilterOptionButton>
            ))}
          </FilterOptions>
        </FilterPanelSection>

        <FilterPanelSection>
          <FilterPanelTitle>PM-jay</FilterPanelTitle>
          <FilterOptions>
            <FilterRadioOption type="button" $active={pmjayEnabled} onClick={() => setPmjayEnabled(true)}>
              <FilterRadioMark $active={pmjayEnabled} />
              Yes
            </FilterRadioOption>
            <FilterRadioOption type="button" $active={!pmjayEnabled} onClick={() => setPmjayEnabled(false)}>
              <FilterRadioMark $active={!pmjayEnabled} />
              No
            </FilterRadioOption>
          </FilterOptions>
        </FilterPanelSection>

        <FilterPanelSection>
          <FilterPanelTitle>Ratings</FilterPanelTitle>
        </FilterPanelSection>

        <FilterPanelSection>
          <FilterPanelTitle>Service type</FilterPanelTitle>
          <FilterOptions>
            {serviceTypes.map((serviceType) => (
              <FilterOptionButton
                key={serviceType}
                type="button"
                $active={selectedServiceType === serviceType}
                onClick={() => setSelectedServiceType(serviceType)}
              >
                {serviceType}
              </FilterOptionButton>
            ))}
          </FilterOptions>
        </FilterPanelSection>

        <FilterDivider />

        <FilterPanelSection>
          <FilterPanelTitle>Centres</FilterPanelTitle>
          <FilterOptions>
            {centreTypes.map((centre) => (
              <FilterRadioOption
                key={centre}
                type="button"
                $active={selectedCentres.includes(centre)}
                onClick={() => toggleCentre(centre)}
              >
                <FilterRadioMark $active={selectedCentres.includes(centre)} $square />
                {centre}
              </FilterRadioOption>
            ))}
          </FilterOptions>
        </FilterPanelSection>

        <FilterDivider />

        <FilterPanelSection>
          <FilterPanelTitle>Distance</FilterPanelTitle>
          <FilterDistanceLabels>
            <span>0 KM</span>
            <span>15 KM</span>
            <span>50 KM</span>
          </FilterDistanceLabels>
        </FilterPanelSection>

        <ApplyFilterButton type="button" onClick={onClose}>
          Apply
        </ApplyFilterButton>
      </FilterModalPanel>
    </FilterOverlay>
  )
}

export default FilterModal
