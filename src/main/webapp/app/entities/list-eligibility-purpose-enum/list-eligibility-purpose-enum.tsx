import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './list-eligibility-purpose-enum.reducer';
import { IListEligibilityPurposeEnum } from 'app/shared/model/list-eligibility-purpose-enum.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IListEligibilityPurposeEnumProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ListEligibilityPurposeEnum = (props: IListEligibilityPurposeEnumProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { listEligibilityPurposeEnumList, match, loading } = props;
  return (
    <div>
      <h2 id="list-eligibility-purpose-enum-heading" data-cy="ListEligibilityPurposeEnumHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.listEligibilityPurposeEnum.home.title">List Eligibility Purpose Enums</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.listEligibilityPurposeEnum.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.listEligibilityPurposeEnum.home.createLabel">
              Create new List Eligibility Purpose Enum
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {listEligibilityPurposeEnumList && listEligibilityPurposeEnumList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listEligibilityPurposeEnum.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listEligibilityPurposeEnum.erp">Erp</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.listEligibilityPurposeEnum.coverageEligibilityRequest">
                    Coverage Eligibility Request
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {listEligibilityPurposeEnumList.map((listEligibilityPurposeEnum, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${listEligibilityPurposeEnum.id}`} color="link" size="sm">
                      {listEligibilityPurposeEnum.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.EligibilityPurposeEnum.${listEligibilityPurposeEnum.erp}`} />
                  </td>
                  <td>
                    {listEligibilityPurposeEnum.coverageEligibilityRequest ? (
                      <Link to={`coverage-eligibility-request/${listEligibilityPurposeEnum.coverageEligibilityRequest.id}`}>
                        {listEligibilityPurposeEnum.coverageEligibilityRequest.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${listEligibilityPurposeEnum.id}`}
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
                        to={`${match.url}/${listEligibilityPurposeEnum.id}/edit`}
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
                        to={`${match.url}/${listEligibilityPurposeEnum.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.listEligibilityPurposeEnum.home.notFound">
                No List Eligibility Purpose Enums found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ listEligibilityPurposeEnum }: IRootState) => ({
  listEligibilityPurposeEnumList: listEligibilityPurposeEnum.entities,
  loading: listEligibilityPurposeEnum.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListEligibilityPurposeEnum);
