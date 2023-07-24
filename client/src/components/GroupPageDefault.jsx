import Header from "./Header";
import Footer from './Footer';

function GroupPageDefault({children}) {
    return (
        <div style={{height:"100%"}}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default GroupPageDefault;