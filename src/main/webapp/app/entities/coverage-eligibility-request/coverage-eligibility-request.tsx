import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './coverage-eligibility-request.reducer';
import { ICoverageEligibilityRequest } from 'app/shared/model/coverage-eligibility-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoverageEligibilityRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CoverageEligibilityRequest = (props: ICoverageEligibilityRequestProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { coverageEligibilityRequestList, match, loading } = props;
  return (
    <div>
      <h2 id="coverage-eligibility-request-heading" data-cy="CoverageEligibilityRequestHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.home.title">Coverage Eligibility Requests</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.home.createLabel">
              Create new Coverage Eligibility Request
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {coverageEligibilityRequestList && coverageEligibilityRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.guid">Guid</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.parsed">Parsed</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.priority">Priority</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.servicedDate">Serviced Date</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.servicedDateEnd">Serviced Date End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.patient">Patient</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.provider">Provider</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.insurer">Insurer</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.facility">Facility</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {coverageEligibilityRequestList.map((coverageEligibilityRequest, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${coverageEligibilityRequest.id}`} color="link" size="sm">
                      {coverageEligibilityRequest.id}
                    </Button>
                  </td>
                  <td>{coverageEligibilityRequest.guid}</td>
                  <td>{coverageEligibilityRequest.parsed}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.PriorityEnum.${coverageEligibilityRequest.priority}`} />
                  </td>
                  <td>{coverageEligibilityRequest.identifier}</td>
                  <td>
                    {coverageEligibilityRequest.servicedDate ? (
                      <TextFormat type="date" value={coverageEligibilityRequest.servicedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {coverageEligibilityRequest.servicedDateEnd ? (
                      <TextFormat type="date" value={coverageEligibilityRequest.servicedDateEnd} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {coverageEligibilityRequest.patient ? (
                      <Link to={`patient/${coverageEligibilityRequest.patient.id}`}>{coverageEligibilityRequest.patient.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {coverageEligibilityRequest.provider ? (
                      <Link to={`organization/${coverageEligibilityRequest.provider.id}`}>{coverageEligibilityRequest.provider.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {coverageEligibilityRequest.insurer ? (
                      <Link to={`organization/${coverageEligibilityRequest.insurer.id}`}>{coverageEligibilityRequest.insurer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {coverageEligibilityRequest.facility ? (
                      <Link to={`location/${coverageEligibilityRequest.facility.id}`}>{coverageEligibilityRequest.facility.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${coverageEligibilityRequest.id}`}
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
                        to={`${match.url}/${coverageEligibilityRequest.id}/edit`}
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
                        to={`${match.url}/${coverageEligibilityRequest.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.coverageEligibilityRequest.home.notFound">
                No Coverage Eligibility Requests found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ coverageEligibilityRequest }: IRootState) => ({
  coverageEligibilityRequestList: coverageEligibilityRequest.entities,
  loading: coverageEligibilityRequest.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CoverageEligibilityRequest);
