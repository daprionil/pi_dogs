import dogestIcon from '../assets/dogest_icon.png';

function DogestIcon({styles}) {
    return (
        <img src={dogestIcon} style={{filter:"drop-shadow(1px 1px 5px rgba(0,0,0,0.2)) drop-shadow(2px 2px 0 red)",...styles}} alt="DOGEST" />
    );
}

export default DogestIcon;