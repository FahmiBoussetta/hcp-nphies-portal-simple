import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Texts from './texts';
import TextsDetail from './texts-detail';
import TextsUpdate from './texts-update';
import TextsDeleteDialog from './texts-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TextsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TextsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TextsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Texts} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TextsDeleteDialog} />
  </>
);

export default Routes;
