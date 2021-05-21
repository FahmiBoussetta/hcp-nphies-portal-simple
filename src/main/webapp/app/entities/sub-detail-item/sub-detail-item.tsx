import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sub-detail-item.reducer';
import { ISubDetailItem } from 'app/shared/model/sub-detail-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubDetailItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SubDetailItem = (props: ISubDetailItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { subDetailItemList, match, loading } = props;
  return (
    <div>
      <h2 id="sub-detail-item-heading" data-cy="SubDetailItemHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.home.title">Sub Detail Items</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.home.createLabel">Create new Sub Detail Item</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {subDetailItemList && subDetailItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.tax">Tax</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.transportationSRCA">Transportation SRCA</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.imaging">Imaging</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.laboratory">Laboratory</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.medicalDevice">Medical Device</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.oralHealthIP">Oral Health IP</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.oralHealthOP">Oral Health OP</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.procedure">Procedure</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.services">Services</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.medicationCode">Medication Code</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.unitPrice">Unit Price</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.detailItem">Detail Item</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subDetailItemList.map((subDetailItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${subDetailItem.id}`} color="link" size="sm">
                      {subDetailItem.id}
                    </Button>
                  </td>
                  <td>{subDetailItem.sequence}</td>
                  <td>{subDetailItem.tax}</td>
                  <td>{subDetailItem.transportationSRCA}</td>
                  <td>{subDetailItem.imaging}</td>
                  <td>{subDetailItem.laboratory}</td>
                  <td>{subDetailItem.medicalDevice}</td>
                  <td>{subDetailItem.oralHealthIP}</td>
                  <td>{subDetailItem.oralHealthOP}</td>
                  <td>{subDetailItem.procedure}</td>
                  <td>{subDetailItem.services}</td>
                  <td>{subDetailItem.medicationCode}</td>
                  <td>{subDetailItem.quantity}</td>
                  <td>{subDetailItem.unitPrice}</td>
                  <td>
                    {subDetailItem.detailItem ? (
                      <Link to={`detail-item/${subDetailItem.detailItem.id}`}>{subDetailItem.detailItem.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${subDetailItem.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${subDetailItem.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${subDetailItem.id}/delete`}
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.subDetailItem.home.notFound">No Sub Detail Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ subDetailItem }: IRootState) => ({
  subDetailItemList: subDetailItem.entities,
  loading: subDetailItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubDetailItem);
