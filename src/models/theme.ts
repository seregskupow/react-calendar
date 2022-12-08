import { theme } from '../styles/theme';
import _ from 'lodash';

export type LabelColor = keyof typeof theme.colors;
export type LabelColorTitle = Capitalize<keyof typeof theme.colors>;
