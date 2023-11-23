import React from "react"
import PropTypes from "prop-types"
import classes from "../styles/components/FilterBox.module.scss"

function FilterBox({
  onSortChange,
  onFilterChange,
  sortOption,
  filterOptions,
  onFilterApply,
}) {
  const handleSortOptionChange = (e) => {
    onSortChange(e.target.value)
  }

  const handleFilterOptionChange = (e) => {
    onFilterChange({ ...filterOptions, [e.target.name]: e.target.checked })
  }

  return (
    <div className={`${classes.filterBox} shadow col-md-4 container`}>
      <div className={classes.sortOptions}>
        <label>
          Newest{" "}
          <input
            type="radio"
            name="sort"
            value="newest"
            checked={sortOption === "newest"}
            onChange={handleSortOptionChange}
          />
        </label>
        <label>
          Oldest{" "}
          <input
            type="radio"
            name="sort"
            value="oldest"
            checked={sortOption === "oldest"}
            onChange={handleSortOptionChange}
          />
        </label>
        <label>
          Most Relevant{" "}
          <input
            type="radio"
            name="sort"
            value="relevant"
            checked={sortOption === "relevant"}
            onChange={handleSortOptionChange}
          />
        </label>
      </div>
      <hr />
      <div className={classes.filterOptions}>
        <label>
          WiFi{" "}
          <input
            type="checkbox"
            name="wifi"
            checked={filterOptions.wifi}
            onChange={handleFilterOptionChange}
          />
        </label>
        <label>
          Breakfast{" "}
          <input
            type="checkbox"
            name="breakfast"
            checked={filterOptions.breakfast}
            onChange={handleFilterOptionChange}
          />
        </label>
        <label>
          Parking{" "}
          <input
            type="checkbox"
            name="parking"
            checked={filterOptions.parking}
            onChange={handleFilterOptionChange}
          />
        </label>
        <label>
          Pets{" "}
          <input
            type="checkbox"
            name="pets"
            checked={filterOptions.pets}
            onChange={handleFilterOptionChange}
          />
        </label>
      </div>
      <button className={classes.filterBtn} onClick={onFilterApply}>
        Filter
      </button>
    </div>
  )
}

FilterBox.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  filterOptions: PropTypes.object.isRequired,
  onFilterApply: PropTypes.func.isRequired,
}

export default FilterBox
