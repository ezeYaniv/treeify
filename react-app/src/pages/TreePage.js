import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TreeResults from '../components/TreeResults';
import fetchDom from '../scripts/fetchDom';

const TreePage = () => {
	const [query, setQuery] = useState('');
	const [treeBody, setTreeBody] = useState({});

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
      const body = fetchDom(query);
      console.log(body);
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
