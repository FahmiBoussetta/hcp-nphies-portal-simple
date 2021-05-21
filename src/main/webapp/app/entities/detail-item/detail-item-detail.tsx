import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './detail-item.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDetailItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DetailItemDetail = (props: IDetailItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { detailItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="detailItemDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.detail.title">DetailItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.id}</dd>
          <dt>
            <span id="sequence">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.sequence">Sequence</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.sequence}</dd>
          <dt>
            <span id="tax">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.tax">Tax</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.tax}</dd>
          <dt>
            <span id="transportationSRCA">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.transportationSRCA">Transportation SRCA</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.transportationSRCA}</dd>
          <dt>
            <span id="imaging">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.imaging">Imaging</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.imaging}</dd>
          <dt>
            <span id="laboratory">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.laboratory">Laboratory</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.laboratory}</dd>
          <dt>
            <span id="medicalDevice">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.medicalDevice">Medical Device</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.medicalDevice}</dd>
          <dt>
            <span id="oralHealthIP">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.oralHealthIP">Oral Health IP</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.oralHealthIP}</dd>
          <dt>
            <span id="oralHealthOP">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.oralHealthOP">Oral Health OP</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.oralHealthOP}</dd>
          <dt>
            <span id="procedure">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.procedure">Procedure</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.procedure}</dd>
          <dt>
            <span id="services">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.services">Services</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.services}</dd>
          <dt>
            <span id="medicationCode">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.medicationCode">Medication Code</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.medicationCode}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.quantity}</dd>
          <dt>
            <span id="unitPrice">
              <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.unitPrice">Unit Price</Translate>
            </span>
          </dt>
          <dd>{detailItemEntity.unitPrice}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.detailItem.item">Item</Translate>
          </dt>
          <dd>{detailItemEntity.item ? detailItemEntity.item.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/detail-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/detail-item/${detailItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ detailItem }: IRootState) => ({
  detailItemEntity: detailItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DetailItemDetail);
