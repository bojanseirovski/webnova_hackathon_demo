import React from 'react';

type TimesOnTargetProps = {
    pass:string;
}

const TimesOnTarget:React.FunctionComponent<TimesOnTargetProps> = (props) => {
    const {pass} = props;
    return (
        <div className='row onesat-times'>
            <div className="col-6">
                {pass} &nbsp;
            </div>
        </div>
    );
}

export default TimesOnTarget;