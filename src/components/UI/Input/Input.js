import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;

    switch (props.inputType) {
        case ('input'):
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('textareat'):
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('select'):
             inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}>
                    
                    {props.elementConfig.options.map(option => (
                        
                        <option key={option.value} value={option.value}>
                            {option.dispalyValue}
                        </option>
                        
                      ))}
                </select>
            )
            break;

        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;