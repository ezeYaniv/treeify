import React from 'react';

const SearchBar = ({ query, handleQueryChange, onFormSubmit }) => {

	return (
		<form onSubmit={onFormSubmit}>
			<label htmlFor="inputQuery"> Please input a URL you'd like to Treeify.</label>
			<input
				id="inputQuery"
				value={query}
				onChange={handleQueryChange}
				placeholder="https://www.example.com"
			/>
			<input className="button" type="submit" value="Treeify" />
		</form>
	);
};

export default SearchBar;
