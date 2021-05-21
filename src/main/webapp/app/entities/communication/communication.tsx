import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './communication.reducer';
import { ICommunication } from 'app/shared/model/communication.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommunicationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Communication = (props: ICommunicationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { communicationList, match, loading } = props;
  return (
    <div>
      <h2 id="communication-heading" data-cy="CommunicationHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.communication.home.title">Communications</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.communication.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.communication.home.createLabel">Create new Communication</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {communicationList && communicationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.guid">Guid</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.isQueued">Is Queued</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.parsed">Parsed</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.priority">Priority</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.subject">Subject</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.sender">Sender</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.recipient">Recipient</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.communication.about">About</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {communicationList.map((communication, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${communication.id}`} color="link" size="sm">
                      {communication.id}
                    </Button>
                  </td>
                  <td>{communication.guid}</td>
                  <td>{communication.isQueued ? 'true' : 'false'}</td>
                  <td>{communication.parsed}</td>
                  <td>{communication.identifier}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.CommunicationPriorityEnum.${communication.priority}`} />
                  </td>
                  <td>{communication.subject ? <Link to={`patient/${communication.subject.id}`}>{communication.subject.id}</Link> : ''}</td>
                  <td>
                    {communication.sender ? <Link to={`organization/${communication.sender.id}`}>{communication.sender.id}</Link> : ''}
                  </td>
                  <td>
                    {communication.recipient ? (
                      <Link to={`organization/${communication.recipient.id}`}>{communication.recipient.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{communication.about ? <Link to={`claim/${communication.about.id}`}>{communication.about.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${communication.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${communication.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${communication.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.communication.home.notFound">No Communications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ communication }: IRootState) => ({
  communicationList: communication.entities,
  loading: communication.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Communication);
