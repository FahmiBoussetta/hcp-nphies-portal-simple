import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './practitioner-role.reducer';
import { IPractitionerRole } from 'app/shared/model/practitioner-role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPractitionerRoleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PractitionerRole = (props: IPractitionerRoleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { practitionerRoleList, match, loading } = props;
  return (
    <div>
      <h2 id="practitioner-role-heading" data-cy="PractitionerRoleHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.home.title">Practitioner Roles</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.home.createLabel">Create new Practitioner Role</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {practitionerRoleList && practitionerRoleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.guid">Guid</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.forceId">Force Id</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.practitioner">Practitioner</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.organization">Organization</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {practitionerRoleList.map((practitionerRole, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${practitionerRole.id}`} color="link" size="sm">
                      {practitionerRole.id}
                    </Button>
                  </td>
                  <td>{practitionerRole.guid}</td>
                  <td>{practitionerRole.forceId}</td>
                  <td>
                    {practitionerRole.start ? <TextFormat type="date" value={practitionerRole.start} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{practitionerRole.end ? <TextFormat type="date" value={practitionerRole.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {practitionerRole.practitioner ? (
                      <Link to={`practitioner/${practitionerRole.practitioner.id}`}>{practitionerRole.practitioner.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {practitionerRole.organization ? (
                      <Link to={`organization/${practitionerRole.organization.id}`}>{practitionerRole.organization.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${practitionerRole.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${practitionerRole.id}/edit`}
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
                        to={`${match.url}/${practitionerRole.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.practitionerRole.home.notFound">No Practitioner Roles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ practitionerRole }: IRootState) => ({
  practitionerRoleList: practitionerRole.entities,
  loading: practitionerRole.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PractitionerRole);
