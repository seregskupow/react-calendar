import styled, { css } from 'styled-components';
import { LabelColor } from '../../models/theme';
import { theme } from '../../styles/theme';

interface LabelProps {
	color?: LabelColor;
}

export const LabelWrapper = styled.li<LabelProps>`
	background-color: ${(props) => props.color || props.theme.colors.blue};
	color: #fff;

	font-size: 2rem;

	padding: 0.5rem 1rem;

	border-radius: 5px;
`;
