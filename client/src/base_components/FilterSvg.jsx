import styled from 'styled-components';
import {ReactComponent as SvgFilter} from '../assets/filter_image.svg';

const FilterSvg = styled(SvgFilter)`
    fill: white;
    filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
    transform: scale(0.9);
`;

export default FilterSvg;