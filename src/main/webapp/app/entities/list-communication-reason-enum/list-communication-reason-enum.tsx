import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './list-communication-reason-enum.reducer';
import { IListCommunicationReasonEnum } from 'app/shared/model/list-communication-reason-enum.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IListCommunicationReasonEnumProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ListCommunicationReasonEnum = (props: IListCommunicationReasonEnumProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { listCommunicationReasonEnumList, match, loading } = props;
  return (
    <div>
      <h2 id="list-communication-reason-enum-heading" data-cy="ListCommunicationReasonEnumHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.home.title">List Communication Reason Enums</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.home.createLabel">
              Create new List Communication Reason Enum
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {listCommunicationReasonEnumList && listCommunicationReasonEnumList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.cr">Cr</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.communication">Communication</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {listCommunicationReasonEnumList.map((listCommunicationReasonEnum, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${listCommunicationReasonEnum.id}`} color="link" size="sm">
                      {listCommunicationReasonEnum.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.CommunicationReasonEnum.${listCommunicationReasonEnum.cr}`} />
                  </td>
                  <td>
                    {listCommunicationReasonEnum.communication ? (
                      <Link to={`communication/${listCommunicationReasonEnum.communication.id}`}>
                        {listCommunicationReasonEnum.communication.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${listCommunicationReasonEnum.id}`}
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
                        to={`${match.url}/${listCommunicationReasonEnum.id}/edit`}
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
                        to={`${match.url}/${listCommunicationReasonEnum.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.home.notFound">
                No List Communication Reason Enums found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ listCommunicationReasonEnum }: IRootState) => ({
  listCommunicationReasonEnumList: listCommunicationReasonEnum.entities,
  loading: listCommunicationReasonEnum.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListCommunicationReasonEnum);
