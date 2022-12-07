import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css2?family=Neucha&family=Roboto:wght@100;300;400;500;700;900&display=swap');

	* {
		font-size: 10px;
		margin: 0;
		padding: 0;
	}

	body {
		font-family: 'Roboto', sans-serif;
		background-color: ${(props) => props.theme.bg} ;
	}

	ul, li {
		list-style: none;
	}

	button {
		background: none;
		border: none;
	}
`;

export default GlobalStyles;
