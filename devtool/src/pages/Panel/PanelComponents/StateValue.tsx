import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import StateModifier from './StateModifier';
import './StateValue.css';

interface StateValueProps {
  value: any;
  stateKey: string;
  componentId: number;
}

export const StateValue = ({
  value,
  stateKey,
  componentId,
}: StateValueProps) => {
  return (
    <div className="property-item">
      {Array.isArray(value) ? (
        <details className="state-value-array">
          <summary className="state-value-summary">{`Array [${value.length}]`}</summary>
          <ul>
            {value.map((i: any) => {
              console.log('item in list:', i);
              return (
                <li className="component-info-array-list-item" key={uuidv4()}>
                  <StateValue
                    stateKey={stateKey}
                    value={i}
                    componentId={componentId}
                  />
                </li>
              );
            })}
          </ul>
        </details>
      ) : value === null ? (
        'null'
      ) : value === false ? (
        'false'
      ) : value === true ? (
        'true'
      ) : typeof value === 'number' || typeof value === 'string' ? (
        <StateModifier
          componentId={componentId}
          stateKey={stateKey}
          initValue={value}
        />
      ) : typeof value === 'object' ? (
        value.hasOwnProperty('__isFunction') && value.__isFunction === true ? (
          <details>
            <summary className="constant-property">
              function {stateKey}()
            </summary>
            {value.source}
          </details>
        ) : null
      ) : null}
    </div>
  );
};
