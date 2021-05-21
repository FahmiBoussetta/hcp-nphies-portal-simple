import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payment-reconciliation.reducer';
import { IPaymentReconciliation } from 'app/shared/model/payment-reconciliation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentReconciliationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PaymentReconciliation = (props: IPaymentReconciliationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { paymentReconciliationList, match, loading } = props;
  return (
    <div>
      <h2 id="payment-reconciliation-heading" data-cy="PaymentReconciliationHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.home.title">Payment Reconciliations</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.home.createLabel">
              Create new Payment Reconciliation
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {paymentReconciliationList && paymentReconciliationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.system">System</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.parsed">Parsed</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.periodStart">Period Start</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.periodEnd">Period End</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.outcome">Outcome</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.disposition">Disposition</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.paymentAmount">Payment Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.paymentIdentifier">Payment Identifier</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.paymentIssuer">Payment Issuer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentReconciliationList.map((paymentReconciliation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${paymentReconciliation.id}`} color="link" size="sm">
                      {paymentReconciliation.id}
                    </Button>
                  </td>
                  <td>{paymentReconciliation.value}</td>
                  <td>{paymentReconciliation.system}</td>
                  <td>{paymentReconciliation.parsed}</td>
                  <td>
                    {paymentReconciliation.periodStart ? (
                      <TextFormat type="date" value={paymentReconciliation.periodStart} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {paymentReconciliation.periodEnd ? (
                      <TextFormat type="date" value={paymentReconciliation.periodEnd} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{paymentReconciliation.outcome}</td>
                  <td>{paymentReconciliation.disposition}</td>
                  <td>{paymentReconciliation.paymentAmount}</td>
                  <td>{paymentReconciliation.paymentIdentifier}</td>
                  <td>
                    {paymentReconciliation.paymentIssuer ? (
                      <Link to={`organization/${paymentReconciliation.paymentIssuer.id}`}>{paymentReconciliation.paymentIssuer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${paymentReconciliation.id}`}
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
                        to={`${match.url}/${paymentReconciliation.id}/edit`}
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
                        to={`${match.url}/${paymentReconciliation.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.paymentReconciliation.home.notFound">
                No Payment Reconciliations found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ paymentReconciliation }: IRootState) => ({
  paymentReconciliationList: paymentReconciliation.entities,
  loading: paymentReconciliation.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentReconciliation);
