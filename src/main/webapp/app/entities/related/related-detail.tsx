import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './related.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRelatedDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RelatedDetail = (props: IRelatedDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { relatedEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="relatedDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.related.detail.title">Related</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{relatedEntity.id}</dd>
          <dt>
            <span id="relationShip">
              <Translate contentKey="hcpNphiesPortalSimpleApp.related.relationShip">Relation Ship</Translate>
            </span>
          </dt>
          <dd>{relatedEntity.relationShip}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.related.claimReference">Claim Reference</Translate>
          </dt>
          <dd>{relatedEntity.claimReference ? relatedEntity.claimReference.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.related.claim">Claim</Translate>
          </dt>
          <dd>{relatedEntity.claim ? relatedEntity.claim.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/related" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/related/${relatedEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ related }: IRootState) => ({
  relatedEntity: related.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDetail);
