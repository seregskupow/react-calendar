import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css2?family=Neucha&family=Roboto:wght@100;300;400;500;700;900&display=swap');

	* {
		font-size: 10px;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
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
	input, textarea {
		outline:none;
		font-family: 'Roboto', sans-serif;
	}

	/* width */
	&::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	&::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 5px;
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 5px;
	}

	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;

export default GlobalStyles;
