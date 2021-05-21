import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cost-to-beneficiary-component.reducer';
import { ICostToBeneficiaryComponent } from 'app/shared/model/cost-to-beneficiary-component.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICostToBeneficiaryComponentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CostToBeneficiaryComponent = (props: ICostToBeneficiaryComponentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { costToBeneficiaryComponentList, match, loading } = props;
  return (
    <div>
      <h2 id="cost-to-beneficiary-component-heading" data-cy="CostToBeneficiaryComponentHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.home.title">Cost To Beneficiary Components</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.home.createLabel">
              Create new Cost To Beneficiary Component
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {costToBeneficiaryComponentList && costToBeneficiaryComponentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.isMoney">Is Money</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.coverage">Coverage</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {costToBeneficiaryComponentList.map((costToBeneficiaryComponent, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${costToBeneficiaryComponent.id}`} color="link" size="sm">
                      {costToBeneficiaryComponent.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`hcpNphiesPortalSimpleApp.CostToBeneficiaryTypeEnum.${costToBeneficiaryComponent.type}`} />
                  </td>
                  <td>{costToBeneficiaryComponent.isMoney ? 'true' : 'false'}</td>
                  <td>{costToBeneficiaryComponent.value}</td>
                  <td>
                    {costToBeneficiaryComponent.coverage ? (
                      <Link to={`coverage/${costToBeneficiaryComponent.coverage.id}`}>{costToBeneficiaryComponent.coverage.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${costToBeneficiaryComponent.id}`}
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
                        to={`${match.url}/${costToBeneficiaryComponent.id}/edit`}
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
                        to={`${match.url}/${costToBeneficiaryComponent.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.costToBeneficiaryComponent.home.notFound">
                No Cost To Beneficiary Components found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ costToBeneficiaryComponent }: IRootState) => ({
  costToBeneficiaryComponentList: costToBeneficiaryComponent.entities,
  loading: costToBeneficiaryComponent.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CostToBeneficiaryComponent);
