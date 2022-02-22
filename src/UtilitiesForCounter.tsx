import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from "./Button";


type UtilitiesForCounterType = {
    disableItem: boolean;
    setDisableItem: (disableItem: boolean) => void;
    onClickHandlerListener: (max: number, min: number) => void;

}


const UtilitiesForCounter = (props: UtilitiesForCounterType) => {

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1);

    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(parseInt(e.currentTarget.value));
    };

    const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
        setMinValue(parseInt(e.currentTarget.value));
    };

    const onClickHandlerListenerForButton = () => {
        props.onClickHandlerListener(maxValue, minValue);
    };

    if (
        maxValue < 0 ||
        minValue < 0 ||
        maxValue < minValue ||
        minValue > maxValue ||
        minValue === maxValue
    ) {
        props.setDisableItem(true);
    } else props.setDisableItem(false);


    useEffect(() => {
        let tempMin = localStorage.getItem("min")
        if (tempMin) {
            setMinValue(JSON.parse(tempMin))
        }
        let tempMax = localStorage.getItem("max")
        if (tempMax) {
            setMaxValue(JSON.parse(tempMax))
        }
    }, [])

    let error = props.disableItem ? "errorValue" : "";

    return (
        <div className="counterUtilities">
            <div>max value:
                <input type="number"
                       className={error}
                       value={maxValue}
                       onChange={onChangeMaxValue}
                />
            </div>
            <div>start value:
                <input type="number"
                       className={error}
                       value={minValue}
                       onChange={onChangeMinValue}/>
            </div>
            <Button
                title={"set"}
                disable={props.disableItem}
                onClickHandler={onClickHandlerListenerForButton}
            />
        </div>
    );
};

export default UtilitiesForCounter;