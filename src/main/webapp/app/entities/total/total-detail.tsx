import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './total.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITotalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TotalDetail = (props: ITotalDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { totalEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="totalDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.total.detail.title">Total</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{totalEntity.id}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="hcpNphiesPortalSimpleApp.total.category">Category</Translate>
            </span>
          </dt>
          <dd>{totalEntity.category}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="hcpNphiesPortalSimpleApp.total.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{totalEntity.amount}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.total.claimResponse">Claim Response</Translate>
          </dt>
          <dd>{totalEntity.claimResponse ? totalEntity.claimResponse.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/total" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/total/${totalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ total }: IRootState) => ({
  totalEntity: total.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TotalDetail);
