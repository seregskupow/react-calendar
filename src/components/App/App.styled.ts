import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;

	height: 100vh;
`;

export const Body = styled.div`
	display: grid;
	grid-template-columns: 15% auto;
	height: calc(100vh - ${(props) => props.theme.layout.headerHeight});
`;
