import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { selectArchiveCurrencies } from '../../features/archiveCurrencies/archiveCurrenciesSlice';
import { useAppSelector } from '../../features/hooks';

const ProtectedRoute = ({
  component: Component,
  pathToRedirect,
  ...rest
}: {
  exact: boolean;
  component: any;
  path: string;
  pathToRedirect: object;
}) => {
  const { codeValute } = useAppSelector(selectArchiveCurrencies);
  return (
    <Route
    {...rest}
      render={() =>
        codeValute ? <Component /> : <Redirect to={pathToRedirect} />
      }
    />
  );
};

export default memo(ProtectedRoute);
