import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './claim-response.reducer';
import { IClaimResponse } from 'app/shared/model/claim-response.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClaimResponseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ClaimResponse = (props: IClaimResponseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { claimResponseList, match, loading } = props;
  return (
    <div>
      <h2 id="claim-response-heading" data-cy="ClaimResponseHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.home.title">Claim Responses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.home.createLabel">Create new Claim Response</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {claimResponseList && claimResponseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.system">System</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.parsed">Parsed</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.outcome">Outcome</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {claimResponseList.map((claimResponse, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${claimResponse.id}`} color="link" size="sm">
                      {claimResponse.id}
                    </Button>
                  </td>
                  <td>{claimResponse.value}</td>
                  <td>{claimResponse.system}</td>
                  <td>{claimResponse.parsed}</td>
                  <td>{claimResponse.outcome}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${claimResponse.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${claimResponse.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${claimResponse.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.claimResponse.home.notFound">No Claim Responses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ claimResponse }: IRootState) => ({
  claimResponseList: claimResponse.entities,
  loading: claimResponse.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClaimResponse);
