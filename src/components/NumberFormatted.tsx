import React from 'react';
import numberFormat from '../utils/numberFormat';

const NumberFormatted = (props: any) => {
    return <span>{numberFormat(isNaN(props.children) ? 0 : props.children)}</span>
}
export default NumberFormatted;
