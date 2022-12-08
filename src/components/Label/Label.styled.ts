import { LabelColor } from '@/models';
import chroma from 'chroma-js';
import styled from 'styled-components';

interface LabelProps {
	color: LabelColor;
	fontSize?: number;
}
/**
 * @param color LabelColor
 * @param fontSize number (rem)
 */
export const LabelElement = styled.div<LabelProps>`
	position: relative;

	padding: 0.2rem 0.5rem;

	background-color: ${(props) =>
		props.theme.colors[props.color] && chroma(`${props.theme.colors[props.color]}`).alpha(0.1).css()};

	border: 1px solid ${(props) => props.theme.colors[props.color]};
	border-radius: 5px;

	color: ${(props) => props.theme.colors[props.color]};

	font-size: ${(props) => (props.fontSize ? `${props.fontSize}rem` : '1rem')};
`;
