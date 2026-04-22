import React from 'react'

// Destructured Props instead of props.searchTerm
const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="../public/search.svg" alt="Search" />

        <input 
          type="text"
          placeholder='Search through Thousands of Movies'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default Search