import { styled } from "styled-components";

const Loader = styled.div`
    width: 50px;
    height: 50px;
    --c: radial-gradient(farthest-side,#F40000 92%,#0000);
    background: 
        var(--c) 50%  0, 
        var(--c) 50%  100%, 
        var(--c) 100% 50%, 
        var(--c) 0    50%;
    background-size: 10px 10px;
    background-repeat: no-repeat;
    animation: s8 0.5s infinite;
    position: relative;
    
    &::before {    
        content:"";
        position: absolute;
        inset:0;
        margin: 3px;
        background:repeating-conic-gradient(#0000 0 35deg,#F40000 0 90deg);
        -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
        border-radius: 50%;
    }

    @keyframes s8 { 
    100%{transform: rotate(.5turn)}
    }
`;
export default Loader;