import React, { useState, useReducer } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import TreeResults from '../components/TreeResults';
import Loader from '../components/Loader';
import '../styles/TreePage.css';

const initialState = {
	loading: false,
	data: null,
	error: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'fetchDataStart':
			return {
				...state,
				loading: true,
				data: null,
				error: null,
			};
		case 'fetchDataSuccess':
			return {
				...state,
				loading: false,
				data: action.data,
				error: null,
			};
		case 'fetchDataFail':
			return {
				...state,
				loading: false,
				data: null,
				error: action.error,
			};
		default:
			return state;
	}
};

const TreePage = () => {
	const [query, setQuery] = useState('');

	const [treeBodyQuery, dispatch] = useReducer(reducer, initialState);

	// ~~~~~~~~~~~~ BACKEND API CALL ~~~~~~~~~~~~~~~
	const callBackendAPI = async (query) => {
		try {
			const response = await axios.post('/', {
				url: query,
			});
			return response;
		} catch (err) {
			throw Error(err.message);
		}
	};

	// ~~~~~~~~~~~ FORM HANDLING ~~~~~~~~~~~~~
	const handleQueryChange = React.useCallback((e) => {
		setQuery(e.target.value);
	}, []);
	const onFormSubmit = React.useCallback(
		(e) => {
			e.preventDefault();
			const regex = /^(http:\/\/|https:\/\/|www.)/;
			if (!regex.test(query)) {
				alert('Invalid URL: it should start with https:// or http://');
				return;
			} else {
				dispatch({ type: 'fetchDataStart' });
				callBackendAPI(query)
					.then((res) =>
						dispatch({
							type: 'fetchDataSuccess',
							data: res.data,
						})
					)
					.catch((err) => dispatch({ type: 'fetchDataFail', error: err }));
			}
		},
		[query]
	);

	return (
		<div className="treepage__container">
			<h1 className="treepage__header">Treeify</h1>
			<SearchBar
				query={query}
				handleQueryChange={handleQueryChange}
				onFormSubmit={onFormSubmit}
				loading={treeBodyQuery.loading}
			/>
			<div className="divider" />
			{treeBodyQuery.loading ? (
				<Loader />
			) : treeBodyQuery.error ? (
				<p className="error__text">
					Oops, there was an error with the website you tried. Please check the URL and try again!
				</p>
			) : (
				!!treeBodyQuery.data && (
					<TreeResults
						treeDom={treeBodyQuery.data.treeDom}
						canvasOffsets={treeBodyQuery.data.canvasOffsets}
					/>
				)
			)}
		</div>
	);
};

export default TreePage;
