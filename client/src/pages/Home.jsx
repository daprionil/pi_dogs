import { styled } from 'styled-components';

import GroupPageDefault from '../components/GroupPageDefault'
import BannerHomePage from '../components/BannerHomePage';
import SearchBarHome from '../components/SearchBarHome';

function Home() {
    return (
        <GroupPageDefault>
            <MainStyled>
                <SearchBarHome />
                <BannerHomePage />
            </MainStyled>
        </GroupPageDefault>
    );
}

const MainStyled = styled.main`
    max-width: 1100px;
    margin: 0 auto;
    overflow: hidden;
`;

export default Home;