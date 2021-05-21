import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './adjudication.reducer';
import { IAdjudication } from 'app/shared/model/adjudication.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdjudicationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Adjudication = (props: IAdjudicationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { adjudicationList, match, loading } = props;
  return (
    <div>
      <h2 id="adjudication-heading" data-cy="AdjudicationHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.home.title">Adjudications</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.home.createLabel">Create new Adjudication</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {adjudicationList && adjudicationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.reason">Reason</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.adjudicationItem">Adjudication Item</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.adjudicationDetailItem">Adjudication Detail Item</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.adjudicationSubDetailItem">
                    Adjudication Sub Detail Item
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adjudicationList.map((adjudication, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${adjudication.id}`} color="link" size="sm">
                      {adjudication.id}
                    </Button>
                  </td>
                  <td>{adjudication.category}</td>
                  <td>{adjudication.reason}</td>
                  <td>{adjudication.amount}</td>
                  <td>{adjudication.value}</td>
                  <td>
                    {adjudication.adjudicationItem ? (
                      <Link to={`adjudication-item/${adjudication.adjudicationItem.id}`}>{adjudication.adjudicationItem.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {adjudication.adjudicationDetailItem ? (
                      <Link to={`adjudication-detail-item/${adjudication.adjudicationDetailItem.id}`}>
                        {adjudication.adjudicationDetailItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {adjudication.adjudicationSubDetailItem ? (
                      <Link to={`adjudication-sub-detail-item/${adjudication.adjudicationSubDetailItem.id}`}>
                        {adjudication.adjudicationSubDetailItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${adjudication.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${adjudication.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudication.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="hcpNphiesPortalSimpleApp.adjudication.home.notFound">No Adjudications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adjudication }: IRootState) => ({
  adjudicationList: adjudication.entities,
  loading: adjudication.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Adjudication);
