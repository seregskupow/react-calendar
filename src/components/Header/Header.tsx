import dayjs from 'dayjs';
import { FC } from 'react';
import { Button, HeaderContainer, YearLabel } from './Header.styled';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsArrowCounterclockwise } from 'react-icons/bs';

interface HeaderProps {
	incrementMonth: () => void;
	decrementMonth: () => void;
	setCurrentMonth: () => void;
	monthIndex: number;
}

const Header: FC<HeaderProps> = ({ decrementMonth, incrementMonth, setCurrentMonth, monthIndex }) => {
	return (
		<HeaderContainer>
			<Button onClick={setCurrentMonth}>
				Today <BsArrowCounterclockwise />
			</Button>
			<Button onClick={() => decrementMonth()}>
				<FaChevronLeft />
			</Button>
			<YearLabel>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</YearLabel>
			<Button onClick={() => incrementMonth()}>
				<FaChevronRight />
			</Button>
		</HeaderContainer>
	);
};

export default Header;
