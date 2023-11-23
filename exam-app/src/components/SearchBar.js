import React from "react"
import bars from "../assets/sidebars.svg"
import PropTypes from "prop-types"
import classes from "../styles/components/SearchBar.module.scss"
import FilterBox from "./FilterBox"

function SearchBar({
  searchTerm,
  onSearchChange,
  onSortFilterToggle,
  onSearch,
  isSortFilterMenuOpen,
  onSortChange,
  onFilterChange,
  sortOption,
  filterOptions,
}) {
  return (
    <div className="bg-secondary">
      <div className="search-bar-container container justify-content-center d-flex pt-2 pb-2">
        <img
          className={`${classes.barsIcon}`}
          src={bars}
          onClick={onSortFilterToggle}
          alt="bars"
        />
        <input
          className={`col-md-6 ${classes.searchBar}`}
          type="text"
          placeholder="Search Venues..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        <button onClick={onSearch} className={classes.searchButton}>
          Search
        </button>
      </div>
      <div className="bg-white pt-2">
        {isSortFilterMenuOpen && (
          <FilterBox
            onSortChange={onSortChange}
            onFilterChange={onFilterChange}
            sortOption={sortOption}
            filterOptions={filterOptions}
            onFilterApply={onSortFilterToggle}
          />
        )}
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSortFilterToggle: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSortFilterMenuOpen: PropTypes.bool.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  filterOptions: PropTypes.object.isRequired,
}

export default SearchBar
