import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Prefixes from './prefixes';
import PrefixesDetail from './prefixes-detail';
import PrefixesUpdate from './prefixes-update';
import PrefixesDeleteDialog from './prefixes-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrefixesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrefixesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrefixesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Prefixes} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrefixesDeleteDialog} />
  </>
);

export default Routes;
