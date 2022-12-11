import styled from 'styled-components';

/**
 * Button with Text and SVG
 */
export const Button = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	background-color: ${(props) => props.theme.colors.blue};
	color: #fff;

	border-radius: ${(props) => props.theme.containerBrdrR};
	border: 1px solid ${(props) => props.theme.colors.blue};
	padding: 0.5rem;

	font-size: 2rem;
	text-decoration: none;

	transition: all 0.2s ease;

	cursor: pointer;

	& svg {
		font-size: 2rem;
	}

	&:active {
		transform: scale(0.9);
	}

	&:hover {
		background-color: #d9e0ff;
		color: ${(props) => props.theme.colors.blue};
	}
`;
