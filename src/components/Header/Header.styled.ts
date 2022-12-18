import styled from 'styled-components';

export const HeaderContainer = styled.header`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;

	height: auto;

	padding: 1rem;

	border-bottom: 1px solid ${(props) => props.theme.colors.blue};
	box-shadow: ${(props) => props.theme.shadows.sh1};

	@media (min-width: 1100px) {
		grid-template-columns: 1fr auto 1fr;
		height: ${({ theme }) => theme.layout.headerHeight};

		padding: 0;
	}
`;

export const HeaderContainerCell = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	@media (min-width: 1100px) {
		&:nth-child(1) {
			justify-content: flex-end;
		}

		&:nth-child(3) {
			justify-content: flex-start;
		}
	}
`;

export const Button = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	background-color: ${(props) => props.theme.colors.blue};
	color: #fff;

	border-radius: ${(props) => props.theme.containerBrdrR};
	border: 1px solid ${(props) => props.theme.colors.blue};

	padding: 1rem;

	font-size: 2rem;
	text-decoration: none;

	transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;

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
