import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './insurance-benefit.reducer';
import { IInsuranceBenefit } from 'app/shared/model/insurance-benefit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceBenefitProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InsuranceBenefit = (props: IInsuranceBenefitProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { insuranceBenefitList, match, loading } = props;
  return (
    <div>
      <h2 id="insurance-benefit-heading" data-cy="InsuranceBenefitHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.home.title">Insurance Benefits</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.home.createLabel">Create new Insurance Benefit</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {insuranceBenefitList && insuranceBenefitList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.allowed">Allowed</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.used">Used</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.responseInsuranceItem">
                    Response Insurance Item
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {insuranceBenefitList.map((insuranceBenefit, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${insuranceBenefit.id}`} color="link" size="sm">
                      {insuranceBenefit.id}
                    </Button>
                  </td>
                  <td>{insuranceBenefit.allowed}</td>
                  <td>{insuranceBenefit.used}</td>
                  <td>
                    {insuranceBenefit.responseInsuranceItem ? (
                      <Link to={`response-insurance-item/${insuranceBenefit.responseInsuranceItem.id}`}>
                        {insuranceBenefit.responseInsuranceItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${insuranceBenefit.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${insuranceBenefit.id}/edit`}
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
                        to={`${match.url}/${insuranceBenefit.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.insuranceBenefit.home.notFound">No Insurance Benefits found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ insuranceBenefit }: IRootState) => ({
  insuranceBenefitList: insuranceBenefit.entities,
  loading: insuranceBenefit.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceBenefit);
