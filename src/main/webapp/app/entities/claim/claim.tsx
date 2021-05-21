import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './claim.reducer';
import { IClaim } from 'app/shared/model/claim.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClaimProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Claim = (props: IClaimProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { claimList, match, loading } = props;
  return (
    <div>
      <h2 id="claim-heading" data-cy="ClaimHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.claim.home.title">Claims</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.claim.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.claim.home.createLabel">Create new Claim</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {claimList && claimList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.guid">Guid</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.isQueued">Is Queued</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.parsed">Parsed</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.use">Use</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.subType">Sub Type</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.eligibilityOffline">Eligibility Offline</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.eligibilityOfflineDate">Eligibility Offline Date</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.authorizationOfflineDate">Authorization Offline Date</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.billableStart">Billable Start</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.billableEnd">Billable End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.priority">Priority</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.fundsReserve">Funds Reserve</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.encounter">Encounter</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.eligibilityResponse">Eligibility Response</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.patient">Patient</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.provider">Provider</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.insurer">Insurer</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.prescription">Prescription</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.originalPrescription">Original Prescription</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.payee">Payee</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.referral">Referral</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.facility">Facility</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.claim.accident">Accident</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {claimList.map((claim, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${claim.id}`} color="link" size="sm">
                      {claim.id}
                    </Button>
                  </td>
                  <td>{claim.guid}</td>
                  <td>{claim.isQueued ? 'true' : 'false'}</td>
                  <td>{claim.parsed}</td>
                  <td>{claim.identifier}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.Use.${claim.use}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.ClaimTypeEnum.${claim.type}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.ClaimSubTypeEnum.${claim.subType}`} />
                  </td>
                  <td>{claim.eligibilityOffline}</td>
                  <td>
                    {claim.eligibilityOfflineDate ? (
                      <TextFormat type="date" value={claim.eligibilityOfflineDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {claim.authorizationOfflineDate ? (
                      <TextFormat type="date" value={claim.authorizationOfflineDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{claim.billableStart ? <TextFormat type="date" value={claim.billableStart} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{claim.billableEnd ? <TextFormat type="date" value={claim.billableEnd} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.PriorityEnum.${claim.priority}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.FundsReserveEnum.${claim.fundsReserve}`} />
                  </td>
                  <td>{claim.encounter ? <Link to={`encounter/${claim.encounter.id}`}>{claim.encounter.id}</Link> : ''}</td>
                  <td>
                    {claim.eligibilityResponse ? (
                      <Link to={`coverage-eligibility-response/${claim.eligibilityResponse.id}`}>{claim.eligibilityResponse.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{claim.patient ? <Link to={`patient/${claim.patient.id}`}>{claim.patient.id}</Link> : ''}</td>
                  <td>{claim.provider ? <Link to={`organization/${claim.provider.id}`}>{claim.provider.id}</Link> : ''}</td>
                  <td>{claim.insurer ? <Link to={`organization/${claim.insurer.id}`}>{claim.insurer.id}</Link> : ''}</td>
                  <td>
                    {claim.prescription ? <Link to={`reference-identifier/${claim.prescription.id}`}>{claim.prescription.id}</Link> : ''}
                  </td>
                  <td>
                    {claim.originalPrescription ? (
                      <Link to={`reference-identifier/${claim.originalPrescription.id}`}>{claim.originalPrescription.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{claim.payee ? <Link to={`payee/${claim.payee.id}`}>{claim.payee.id}</Link> : ''}</td>
                  <td>{claim.referral ? <Link to={`reference-identifier/${claim.referral.id}`}>{claim.referral.id}</Link> : ''}</td>
                  <td>{claim.facility ? <Link to={`location/${claim.facility.id}`}>{claim.facility.id}</Link> : ''}</td>
                  <td>{claim.accident ? <Link to={`accident/${claim.accident.id}`}>{claim.accident.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${claim.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${claim.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${claim.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.claim.home.notFound">No Claims found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ claim }: IRootState) => ({
  claimList: claim.entities,
  loading: claim.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Claim);
