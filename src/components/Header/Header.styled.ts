import styled from 'styled-components';

export const HeaderContainer = styled.header`
	display: flex;
	gap: 1rem;
	justify-content: center;
	align-items: center;

	height: 10vh;

	border-bottom: 1px solid ${(props) => props.theme.colors.blue};
`;

export const Button = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	background-color: ${(props) => props.theme.colors.blue};
	color: #fff;

	border-radius: 10px;
	border: 1px solid ${(props) => props.theme.colors.blue};

	padding: 1rem;

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

export const YearLabel = styled.span`
	font-size: 3rem;
	font-weight: bold;

	min-width: 300px;

	text-align: center;
`;
