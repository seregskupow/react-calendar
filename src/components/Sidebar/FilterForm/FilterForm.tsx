import { FieldLabel, TextInput } from '@/components/UI';

import { ChangeEvent } from 'react';
import { FilterWrapper } from './FilterForm.styled';
import _ from 'lodash';
import { useActions } from '@/store';

const FilterForm = () => {
	const { setTitleFilter } = useActions();

	const onChange = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
		setTitleFilter(e.target.value);
	}, 250);
	return (
		<FilterWrapper>
			<FieldLabel>Filter tasks by title or label</FieldLabel>
			<TextInput onChange={onChange} />
		</FilterWrapper>
	);
};

export default FilterForm;
