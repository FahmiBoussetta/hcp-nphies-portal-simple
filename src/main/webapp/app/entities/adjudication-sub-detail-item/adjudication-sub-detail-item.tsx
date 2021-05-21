import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './adjudication-sub-detail-item.reducer';
import { IAdjudicationSubDetailItem } from 'app/shared/model/adjudication-sub-detail-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdjudicationSubDetailItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AdjudicationSubDetailItem = (props: IAdjudicationSubDetailItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { adjudicationSubDetailItemList, match, loading } = props;
  return (
    <div>
      <h2 id="adjudication-sub-detail-item-heading" data-cy="AdjudicationSubDetailItemHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationSubDetailItem.home.title">Adjudication Sub Detail Items</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationSubDetailItem.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationSubDetailItem.home.createLabel">
              Create new Adjudication Sub Detail Item
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {adjudicationSubDetailItemList && adjudicationSubDetailItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationSubDetailItem.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationSubDetailItem.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationSubDetailItem.adjudicationDetailItem">
                    Adjudication Detail Item
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adjudicationSubDetailItemList.map((adjudicationSubDetailItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${adjudicationSubDetailItem.id}`} color="link" size="sm">
                      {adjudicationSubDetailItem.id}
                    </Button>
                  </td>
                  <td>{adjudicationSubDetailItem.sequence}</td>
                  <td>
                    {adjudicationSubDetailItem.adjudicationDetailItem ? (
                      <Link to={`adjudication-detail-item/${adjudicationSubDetailItem.adjudicationDetailItem.id}`}>
                        {adjudicationSubDetailItem.adjudicationDetailItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationSubDetailItem.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationSubDetailItem.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationSubDetailItem.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationSubDetailItem.home.notFound">
                No Adjudication Sub Detail Items found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adjudicationSubDetailItem }: IRootState) => ({
  adjudicationSubDetailItemList: adjudicationSubDetailItem.entities,
  loading: adjudicationSubDetailItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdjudicationSubDetailItem);
