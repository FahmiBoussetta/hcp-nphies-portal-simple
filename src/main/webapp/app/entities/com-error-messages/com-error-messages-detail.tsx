import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './com-error-messages.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComErrorMessagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ComErrorMessagesDetail = (props: IComErrorMessagesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { comErrorMessagesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="comErrorMessagesDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.comErrorMessages.detail.title">ComErrorMessages</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{comErrorMessagesEntity.id}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="hcpNphiesPortalSimpleApp.comErrorMessages.message">Message</Translate>
            </span>
          </dt>
          <dd>{comErrorMessagesEntity.message}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.comErrorMessages.communication">Communication</Translate>
          </dt>
          <dd>{comErrorMessagesEntity.communication ? comErrorMessagesEntity.communication.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/com-error-messages" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/com-error-messages/${comErrorMessagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ comErrorMessages }: IRootState) => ({
  comErrorMessagesEntity: comErrorMessages.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ComErrorMessagesDetail);
