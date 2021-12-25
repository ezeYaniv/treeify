import { useState, useReducer } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import TreeResults from '../components/TreeResults';

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
	const [treeBody, setTreeBody] = useState({});

	const [state, dispatch] = useReducer(reducer, initialState);

	const callBackendAPI = async (query) => {
		const response = await axios.post('/', {
			url: query,
		});
		console.log(response.status);
		const body = response;

		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};

	// ~~~~~~~~~~~ FORM HANDLING ~~~~~~~~~~~~~
	const handleQueryChange = (e) => {
		setQuery(e.target.value);
	};
	const onFormSubmit = (e) => {
		e.preventDefault();
		const regex = /^(http:\/\/|https:\/\/|www.)/;
		if (!regex.test(query)) {
			alert('Invalid URL: it should start with https://, http://, or www.');
			return;
		} else {
			// TODO - treeify here
			/* send API request to our express server,
			await response */
			callBackendAPI(query)
				.then((res) => setTreeBody(res))
				.catch((err) => console.error(err));
		}
	};

	return (
		<>
			<SearchBar query={query} handleQueryChange={handleQueryChange} onFormSubmit={onFormSubmit} />
			{!!Object.keys(treeBody).length && <TreeResults />}
		</>
	);
};

export default TreePage;
