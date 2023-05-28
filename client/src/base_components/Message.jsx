import styled from "styled-components";

function Message({type,message}) {
    return (
        <ContentMessage type={type}>
            <p>{message}</p>
        </ContentMessage>
    );
}

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

const colorsType = {
    error:'#ff4116',
    success:'#00f024'
}

export default Message;