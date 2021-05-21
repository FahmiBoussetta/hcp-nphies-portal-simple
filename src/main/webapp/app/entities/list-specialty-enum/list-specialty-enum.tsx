import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './list-specialty-enum.reducer';
import { IListSpecialtyEnum } from 'app/shared/model/list-specialty-enum.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IListSpecialtyEnumProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ListSpecialtyEnum = (props: IListSpecialtyEnumProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { listSpecialtyEnumList, match, loading } = props;
  return (
    <div>
      <h2 id="list-specialty-enum-heading" data-cy="ListSpecialtyEnumHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.home.title">List Specialty Enums</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.home.createLabel">Create new List Specialty Enum</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {listSpecialtyEnumList && listSpecialtyEnumList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.s">S</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.practitionerRole">Practitioner Role</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {listSpecialtyEnumList.map((listSpecialtyEnum, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${listSpecialtyEnum.id}`} color="link" size="sm">
                      {listSpecialtyEnum.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.SpecialtyEnum.${listSpecialtyEnum.s}`} />
                  </td>
                  <td>
                    {listSpecialtyEnum.practitionerRole ? (
                      <Link to={`practitioner-role/${listSpecialtyEnum.practitionerRole.id}`}>{listSpecialtyEnum.practitionerRole.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${listSpecialtyEnum.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${listSpecialtyEnum.id}/edit`}
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
                        to={`${match.url}/${listSpecialtyEnum.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.listSpecialtyEnum.home.notFound">No List Specialty Enums found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ listSpecialtyEnum }: IRootState) => ({
  listSpecialtyEnumList: listSpecialtyEnum.entities,
  loading: listSpecialtyEnum.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialtyEnum);
