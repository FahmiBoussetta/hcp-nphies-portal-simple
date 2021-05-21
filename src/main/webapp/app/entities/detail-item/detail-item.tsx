import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './detail-item.reducer';
import { IDetailItem } from 'app/shared/model/detail-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDetailItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DetailItem = (props: IDetailItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { detailItemList, match, loading } = props;
  return (
    <div>
      <h2 id="detail-item-heading" data-cy="DetailItemHeading">
        <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.home.title">Detail Items</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.home.createLabel">Create new Detail Item</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {detailItemList && detailItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.sequence">Sequence</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.tax">Tax</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.transportationSRCA">Transportation SRCA</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.imaging">Imaging</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.laboratory">Laboratory</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.medicalDevice">Medical Device</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.oralHealthIP">Oral Health IP</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.oralHealthOP">Oral Health OP</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.procedure">Procedure</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.services">Services</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.medicationCode">Medication Code</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.unitPrice">Unit Price</Translate>
                </th>
                <th>
                  <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.item">Item</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {detailItemList.map((detailItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${detailItem.id}`} color="link" size="sm">
                      {detailItem.id}
                    </Button>
                  </td>
                  <td>{detailItem.sequence}</td>
                  <td>{detailItem.tax}</td>
                  <td>{detailItem.transportationSRCA}</td>
                  <td>{detailItem.imaging}</td>
                  <td>{detailItem.laboratory}</td>
                  <td>{detailItem.medicalDevice}</td>
                  <td>{detailItem.oralHealthIP}</td>
                  <td>{detailItem.oralHealthOP}</td>
                  <td>{detailItem.procedure}</td>
                  <td>{detailItem.services}</td>
                  <td>{detailItem.medicationCode}</td>
                  <td>{detailItem.quantity}</td>
                  <td>{detailItem.unitPrice}</td>
                  <td>{detailItem.item ? <Link to={`item/${detailItem.item.id}`}>{detailItem.item.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${detailItem.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${detailItem.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${detailItem.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.home.notFound">No Detail Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ detailItem }: IRootState) => ({
  detailItemList: detailItem.entities,
  loading: detailItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DetailItem);
