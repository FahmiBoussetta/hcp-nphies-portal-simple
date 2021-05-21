import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './coverage-eligibility-response.reducer';
import { ICoverageEligibilityResponse } from 'app/shared/model/coverage-eligibility-response.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoverageEligibilityResponseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CoverageEligibilityResponse = (props: ICoverageEligibilityResponseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { coverageEligibilityResponseList, match, loading } = props;
  return (
    <div>
      <h2 id="coverage-eligibility-response-heading" data-cy="CoverageEligibilityResponseHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.home.title">Coverage Eligibility Responses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.home.createLabel">
              Create new Coverage Eligibility Response
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {coverageEligibilityResponseList && coverageEligibilityResponseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.system">System</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.parsed">Parsed</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.outcome">Outcome</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.serviced">Serviced</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.servicedEnd">Serviced End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.disposition">Disposition</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.notInforceReason">
                    Not Inforce Reason
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.patient">Patient</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.insurer">Insurer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {coverageEligibilityResponseList.map((coverageEligibilityResponse, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${coverageEligibilityResponse.id}`} color="link" size="sm">
                      {coverageEligibilityResponse.id}
                    </Button>
                  </td>
                  <td>{coverageEligibilityResponse.value}</td>
                  <td>{coverageEligibilityResponse.system}</td>
                  <td>{coverageEligibilityResponse.parsed}</td>
                  <td>{coverageEligibilityResponse.outcome}</td>
                  <td>
                    {coverageEligibilityResponse.serviced ? (
                      <TextFormat type="date" value={coverageEligibilityResponse.serviced} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {coverageEligibilityResponse.servicedEnd ? (
                      <TextFormat type="date" value={coverageEligibilityResponse.servicedEnd} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{coverageEligibilityResponse.disposition}</td>
                  <td>{coverageEligibilityResponse.notInforceReason}</td>
                  <td>
                    {coverageEligibilityResponse.patient ? (
                      <Link to={`patient/${coverageEligibilityResponse.patient.id}`}>{coverageEligibilityResponse.patient.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {coverageEligibilityResponse.insurer ? (
                      <Link to={`organization/${coverageEligibilityResponse.insurer.id}`}>{coverageEligibilityResponse.insurer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${coverageEligibilityResponse.id}`}
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
                        to={`${match.url}/${coverageEligibilityResponse.id}/edit`}
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
                        to={`${match.url}/${coverageEligibilityResponse.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityResponse.home.notFound">
                No Coverage Eligibility Responses found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ coverageEligibilityResponse }: IRootState) => ({
  coverageEligibilityResponseList: coverageEligibilityResponse.entities,
  loading: coverageEligibilityResponse.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CoverageEligibilityResponse);
