import styled from "styled-components";

function Message({type,message, style = ({}) }) {
    return (
        <ContentMessage style={style} type={type}>
            <p>{message}</p>
        </ContentMessage>
    );
};

const ERROR_TYPE_MESSAGE = 'error';
const SUCCESS_TYPE_MESSAGE = 'success';

const colorsType = {
    [`${ERROR_TYPE_MESSAGE}`]:'#ff4116',
    [`${SUCCESS_TYPE_MESSAGE}`]:'#00f024'
};

const ContentMessage =  styled.div`
    width: fit-content;
    margin: 0 auto;
    padding: 10px;

    text-align: center;
    color: ${({type}) =>  colorsType[type] ?? 'inherit'};
    box-shadow: 0 2px 0px ${({type}) =>  colorsType[type] ?? 'inherit'};
    
    p{
        text-shadow: 0 0 1px ${({type}) =>  colorsType[type] ?? 'rgba(0,0,0,0.3)'};
        font-weight: bold;
    }
`;
export {
    ERROR_TYPE_MESSAGE,
    SUCCESS_TYPE_MESSAGE
}
export default Message;