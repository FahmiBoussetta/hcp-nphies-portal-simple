import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './adjudication-detail-item.reducer';
import { IAdjudicationDetailItem } from 'app/shared/model/adjudication-detail-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdjudicationDetailItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AdjudicationDetailItem = (props: IAdjudicationDetailItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { adjudicationDetailItemList, match, loading } = props;
  return (
    <div>
      <h2 id="adjudication-detail-item-heading" data-cy="AdjudicationDetailItemHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailItem.home.title">Adjudication Detail Items</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailItem.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailItem.home.createLabel">
              Create new Adjudication Detail Item
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {adjudicationDetailItemList && adjudicationDetailItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailItem.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailItem.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailItem.adjudicationItem">Adjudication Item</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adjudicationDetailItemList.map((adjudicationDetailItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${adjudicationDetailItem.id}`} color="link" size="sm">
                      {adjudicationDetailItem.id}
                    </Button>
                  </td>
                  <td>{adjudicationDetailItem.sequence}</td>
                  <td>
                    {adjudicationDetailItem.adjudicationItem ? (
                      <Link to={`adjudication-item/${adjudicationDetailItem.adjudicationItem.id}`}>
                        {adjudicationDetailItem.adjudicationItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${adjudicationDetailItem.id}`}
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
                        to={`${match.url}/${adjudicationDetailItem.id}/edit`}
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
                        to={`${match.url}/${adjudicationDetailItem.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.adjudicationDetailItem.home.notFound">
                No Adjudication Detail Items found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adjudicationDetailItem }: IRootState) => ({
  adjudicationDetailItemList: adjudicationDetailItem.entities,
  loading: adjudicationDetailItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdjudicationDetailItem);
