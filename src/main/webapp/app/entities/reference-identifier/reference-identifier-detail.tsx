import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reference-identifier.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReferenceIdentifierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReferenceIdentifierDetail = (props: IReferenceIdentifierDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { referenceIdentifierEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="referenceIdentifierDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.detail.title">ReferenceIdentifier</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{referenceIdentifierEntity.id}</dd>
          <dt>
            <span id="ref">
              <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.ref">Ref</Translate>
            </span>
          </dt>
          <dd>{referenceIdentifierEntity.ref}</dd>
          <dt>
            <span id="idValue">
              <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.idValue">Id Value</Translate>
            </span>
          </dt>
          <dd>{referenceIdentifierEntity.idValue}</dd>
          <dt>
            <span id="identifier">
              <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.identifier">Identifier</Translate>
            </span>
          </dt>
          <dd>{referenceIdentifierEntity.identifier}</dd>
          <dt>
            <span id="display">
              <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.display">Display</Translate>
            </span>
          </dt>
          <dd>{referenceIdentifierEntity.display}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.item">Item</Translate>
          </dt>
          <dd>{referenceIdentifierEntity.item ? referenceIdentifierEntity.item.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.detailItem">Detail Item</Translate>
          </dt>
          <dd>{referenceIdentifierEntity.detailItem ? referenceIdentifierEntity.detailItem.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.referenceIdentifier.subDetailItem">Sub Detail Item</Translate>
          </dt>
          <dd>{referenceIdentifierEntity.subDetailItem ? referenceIdentifierEntity.subDetailItem.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/reference-identifier" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reference-identifier/${referenceIdentifierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ referenceIdentifier }: IRootState) => ({
  referenceIdentifierEntity: referenceIdentifier.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceIdentifierDetail);
