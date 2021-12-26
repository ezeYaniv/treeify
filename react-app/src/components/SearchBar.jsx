import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ query, handleQueryChange, onFormSubmit }) => {
	return (
		<div className="searchform__wrapper">
			<div className="content__container">
				<p className="searchform__text">Please input a URL you'd like to Treeify.</p>
				<form onSubmit={onFormSubmit}>
					<label htmlFor="inputQuery" className="searchform__label">URL</label>
					<input
						id="inputQuery"
						value={query}
						onChange={handleQueryChange}
						placeholder="https://www.example.com"
						className="searchform__input"
					/>
					<div className="button__container">
						<input
							className="button"
							type="submit"
							value="Treeify"
							className="searchform__button"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SearchBar;
