import chroma from 'chroma-js';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SelectedTaskWrapper = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 1rem;

	background-color: #fff;

	border: 1px solid ${({ theme }) => theme.colors.lightGray};

	border-radius: 10px;

	box-shadow: ${(props) => props.theme.shadows.sh1};
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
`;

export const LabelsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

export const TaskTitle = styled.h2`
	font-size: 1.8rem;
	word-wrap: break-word;
`;

export const BtnsContainer = styled.div`
	display: flex;
	gap: 0.5rem;
`;

export const Btn = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	background-color: transparent;
	color: ${(props) => props.theme.colors.darkGray};

	border-radius: 8px;

	padding: 0.5rem;

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

export const EditBtn = styled(Btn)`
	& svg {
		color: ${(props) => props.theme.colors.blue};
	}

	&:hover {
		background-color: ${(props) => chroma(`${props.theme.colors.blue}`).alpha(0.1).css()};
	}
`;

export const DeleteBtn = styled(Btn)`
	& svg {
		color: ${(props) => props.theme.colors.red};
	}

	&:hover {
		background-color: ${(props) => chroma(`${props.theme.colors.red}`).alpha(0.1).css()};
	}
`;
