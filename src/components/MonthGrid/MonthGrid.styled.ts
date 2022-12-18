import styled from 'styled-components';

export const MonthWrapper = styled.div`
	height: 100%;
	width: 100%;

	padding: 2rem;

	box-sizing: border-box;

	overflow: auto;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-rows: repeat(5, minmax(0, 1fr));
	grid-template-columns: repeat(7, minmax(0, 1fr));
	grid-gap: 1px;

	height: inherit;
	min-width: 1075px;
	min-height: 650px;

	background-color: ${(props) => props.theme.colors.lightGray};

	border: 1px solid ${(props) => props.theme.colors.lightGray};

	border-radius: ${(props) => props.theme.containerBrdrR};

	overflow: hidden;
`;
