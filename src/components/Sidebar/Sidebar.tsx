import _ from 'lodash';
import Label from '@/components/Label/Label';
import { SidebarWrapper, LabelsContainer } from './Sidebar.styled';

const Sidebar = () => {
	return (
		<SidebarWrapper>
			<LabelsContainer>
				{new Array(5).fill(null).map((item) => (
					<Label label="Some label" key={_.uniqueId()} />
				))}
			</LabelsContainer>
		</SidebarWrapper>
	);
};

export default Sidebar;
