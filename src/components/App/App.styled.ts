import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;

	height: 100vh;
`;

export const Body = styled.div`
	display: grid;
	grid-template-columns: 1fr;

	height: calc(100vh - ${(props) => props.theme.layout.headerHeight});

	@media (min-width: 1100px) {
		grid-template-columns: 15% auto;
	}
`;
