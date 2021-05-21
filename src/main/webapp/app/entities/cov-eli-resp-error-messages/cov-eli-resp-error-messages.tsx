import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cov-eli-resp-error-messages.reducer';
import { ICovEliRespErrorMessages } from 'app/shared/model/cov-eli-resp-error-messages.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICovEliRespErrorMessagesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CovEliRespErrorMessages = (props: ICovEliRespErrorMessagesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { covEliRespErrorMessagesList, match, loading } = props;
  return (
    <div>
      <h2 id="cov-eli-resp-error-messages-heading" data-cy="CovEliRespErrorMessagesHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.covEliRespErrorMessages.home.title">Cov Eli Resp Error Messages</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.covEliRespErrorMessages.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.covEliRespErrorMessages.home.createLabel">
              Create new Cov Eli Resp Error Messages
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {covEliRespErrorMessagesList && covEliRespErrorMessagesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.covEliRespErrorMessages.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.covEliRespErrorMessages.message">Message</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.covEliRespErrorMessages.coverageEligibilityResponse">
                    Coverage Eligibility Response
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {covEliRespErrorMessagesList.map((covEliRespErrorMessages, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${covEliRespErrorMessages.id}`} color="link" size="sm">
                      {covEliRespErrorMessages.id}
                    </Button>
                  </td>
                  <td>{covEliRespErrorMessages.message}</td>
                  <td>
                    {covEliRespErrorMessages.coverageEligibilityResponse ? (
                      <Link to={`coverage-eligibility-response/${covEliRespErrorMessages.coverageEligibilityResponse.id}`}>
                        {covEliRespErrorMessages.coverageEligibilityResponse.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${covEliRespErrorMessages.id}`}
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
                        to={`${match.url}/${covEliRespErrorMessages.id}/edit`}
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
                        to={`${match.url}/${covEliRespErrorMessages.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.covEliRespErrorMessages.home.notFound">
                No Cov Eli Resp Error Messages found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ covEliRespErrorMessages }: IRootState) => ({
  covEliRespErrorMessagesList: covEliRespErrorMessages.entities,
  loading: covEliRespErrorMessages.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CovEliRespErrorMessages);
