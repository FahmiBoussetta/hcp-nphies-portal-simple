import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './human-name.reducer';
import { IHumanName } from 'app/shared/model/human-name.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHumanNameProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const HumanName = (props: IHumanNameProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { humanNameList, match, loading } = props;
  return (
    <div>
      <h2 id="human-name-heading" data-cy="HumanNameHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.home.title">Human Names</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.home.createLabel">Create new Human Name</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {humanNameList && humanNameList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.family">Family</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.patient">Patient</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.practitioner">Practitioner</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {humanNameList.map((humanName, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${humanName.id}`} color="link" size="sm">
                      {humanName.id}
                    </Button>
                  </td>
                  <td>{humanName.family}</td>
                  <td>{humanName.patient ? <Link to={`patient/${humanName.patient.id}`}>{humanName.patient.id}</Link> : ''}</td>
                  <td>
                    {humanName.practitioner ? (
                      <Link to={`practitioner/${humanName.practitioner.id}`}>{humanName.practitioner.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${humanName.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${humanName.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${humanName.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.humanName.home.notFound">No Human Names found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ humanName }: IRootState) => ({
  humanNameList: humanName.entities,
  loading: humanName.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HumanName);
