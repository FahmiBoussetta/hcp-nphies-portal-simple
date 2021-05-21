import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Insurance = (props: IInsuranceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { insuranceList, match, loading } = props;
  return (
    <div>
      <h2 id="insurance-heading" data-cy="InsuranceHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.home.title">Insurances</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.home.createLabel">Create new Insurance</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {insuranceList && insuranceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.focal">Focal</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.preAuthRef">Pre Auth Ref</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.coverage">Coverage</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.claimResponse">Claim Response</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.claim">Claim</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {insuranceList.map((insurance, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${insurance.id}`} color="link" size="sm">
                      {insurance.id}
                    </Button>
                  </td>
                  <td>{insurance.sequence}</td>
                  <td>{insurance.focal ? 'true' : 'false'}</td>
                  <td>{insurance.preAuthRef}</td>
                  <td>{insurance.coverage ? <Link to={`coverage/${insurance.coverage.id}`}>{insurance.coverage.id}</Link> : ''}</td>
                  <td>
                    {insurance.claimResponse ? (
                      <Link to={`claim-response/${insurance.claimResponse.id}`}>{insurance.claimResponse.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{insurance.claim ? <Link to={`claim/${insurance.claim.id}`}>{insurance.claim.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${insurance.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${insurance.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${insurance.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.insurance.home.notFound">No Insurances found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ insurance }: IRootState) => ({
  insuranceList: insurance.entities,
  loading: insurance.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
