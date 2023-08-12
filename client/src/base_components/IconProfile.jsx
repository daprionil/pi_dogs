import styled from 'styled-components';
import { BiSolidUserCircle } from 'react-icons/bi';

const IconProfile = styled(BiSolidUserCircle)`
        font-size: ${({ $size }) => {
            const sizes = {
                xs: '2rem',
                md: '2.7rem',
                lg: '3.4rem',
                xl: '4.2rem',
                '2xl': '5.2rem',
                '3xl': '6rem',
                '4xl': '7.2rem'
            }
            return sizes[$size]
        }
    };
`;

export default IconProfile;