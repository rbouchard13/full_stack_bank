import React from 'react';
export const UserContext = React.createContext(null);

export default function Card(props){
    function classes(){
        const bg = props.bgcolor ? 'bg-' + props.bgcolor : 'bg-primary';
        const txt = props.txtcolor ? 'text-' + props.txtcolor: 'text-white';
        return `card mb-3 ${bg} ${txt}`;
    }

    return(
        <div className={classes()}>
            <div className="card-header"><h3>{props.header}</h3></div>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id="createStatus" style={{color: "white"}}>{props.status}</div>)}
                {props.warn && (<div id="createStatus" style={{color: "red"}}>{props.warn}</div>)}
            </div>
        </div>
    );
}
