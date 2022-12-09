import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100vw;
	height: 100vh;

	padding: 2rem;
	z-index: 10;
`;

export const ModalBG = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	@supports (backdrop-filter: blur()) {
		background-color: rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(1px);
	}
	@supports not (backdrop-filter: blur()) {
		background-color: hsla(0, 0%, 100%, 0.612);
	}

	z-index: 10;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;

	& h2 {
		font-size: 3rem;
	}
`;

export const ModalForm = styled.form`
	width: 30%;
	min-width: 300px;
	max-height: 100%;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 1rem;

	background-color: #ffffff;

	border: 1px solid lightgrey;
	border-radius: 10px;

	box-shadow: ${(props) => props.theme.shadows.sh2};
	z-index: 11;

	overflow-y: auto;
`;

const sharedInputStyle = (props: any) => css`
	width: 100%;
	font-size: 1.5rem;

	padding: 1rem;

	border-radius: 10px;
	border: 2px solid;
	border-color: lightgrey;

	transition: all 0.3s ease;

	&:focus {
		border-color: ${props.theme.colors.blue};
		box-shadow: 0 0 1px 4px #4362ee63;
	}
`;

export const TextInput = styled.input.attrs({
	type: 'text',
})`
	${sharedInputStyle};
`;

export const TextArea = styled.textarea.attrs({
	rows: 5,
	cols: 5,
})`
	${sharedInputStyle};
	resize: none;
`;

export const GrayBtn = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	background-color: transparent;
	color: ${(props) => props.theme.colors.darkGray};

	border-radius: 8px;

	padding: 0.5rem 1rem;

	font-size: 1.5rem;
	text-decoration: none;

	transition: all 0.2s ease;

	cursor: pointer;

	& svg {
		color: ${(props) => props.theme.colors.darkGray};
		font-size: 2rem;
	}

	&:active {
		transform: scale(0.9);
	}

	&:hover {
		background-color: ${(props) => props.theme.colors.lightGray};
	}
`;

export const LabelsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const LabelWrapper = styled.div`
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 3fr 2fr 0.5fr;

	align-items: center;

	column-gap: 0.5rem;
`;

export const Error = styled.p<SpaceProps>`
	font-size: 1.5rem;
	color: ${(props) => props.theme.colors.red};

	${space}
`;
