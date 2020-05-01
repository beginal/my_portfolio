import React, { useCallback, useState} from 'react';

export const useInput = (initValue = null) => {
  const [ value, setValue ] = useState(initValue);
    const submit = useCallback((e) => {
      setValue(e.target.value)
    }, []);
    return [value, submit]
};