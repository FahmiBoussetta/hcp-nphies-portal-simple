import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './encounter.reducer';
import { IEncounter } from 'app/shared/model/encounter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEncounterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Encounter = (props: IEncounterProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { encounterList, match, loading } = props;
  return (
    <div>
      <h2 id="encounter-heading" data-cy="EncounterHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.home.title">Encounters</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.home.createLabel">Create new Encounter</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {encounterList && encounterList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.guid">Guid</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.forceId">Force Id</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.identifier">Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.encounterClass">Encounter Class</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.serviceType">Service Type</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.priority">Priority</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.subject">Subject</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.hospitalization">Hospitalization</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.serviceProvider">Service Provider</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {encounterList.map((encounter, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${encounter.id}`} color="link" size="sm">
                      {encounter.id}
                    </Button>
                  </td>
                  <td>{encounter.guid}</td>
                  <td>{encounter.forceId}</td>
                  <td>{encounter.identifier}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.EncounterClassEnum.${encounter.encounterClass}`} />
                  </td>
                  <td>{encounter.start ? <TextFormat type="date" value={encounter.start} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{encounter.end ? <TextFormat type="date" value={encounter.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.ServiceTypeEnum.${encounter.serviceType}`} />
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.ActPriorityEnum.${encounter.priority}`} />
                  </td>
                  <td>{encounter.subject ? <Link to={`patient/${encounter.subject.id}`}>{encounter.subject.id}</Link> : ''}</td>
                  <td>
                    {encounter.hospitalization ? (
                      <Link to={`hospitalization/${encounter.hospitalization.id}`}>{encounter.hospitalization.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {encounter.serviceProvider ? (
                      <Link to={`organization/${encounter.serviceProvider.id}`}>{encounter.serviceProvider.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${encounter.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${encounter.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${encounter.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.encounter.home.notFound">No Encounters found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ encounter }: IRootState) => ({
  encounterList: encounter.entities,
  loading: encounter.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);
