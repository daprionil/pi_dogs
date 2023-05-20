import Header from "./Header";
import Footer from './Footer';

function GroupPageDefault({children}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default GroupPageDefault;