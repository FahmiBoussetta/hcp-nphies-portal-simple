import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Suffixes from './suffixes';
import SuffixesDetail from './suffixes-detail';
import SuffixesUpdate from './suffixes-update';
import SuffixesDeleteDialog from './suffixes-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SuffixesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SuffixesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SuffixesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Suffixes} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SuffixesDeleteDialog} />
  </>
);

export default Routes;
