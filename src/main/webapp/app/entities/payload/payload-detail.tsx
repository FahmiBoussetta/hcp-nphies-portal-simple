import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payload.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayloadDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PayloadDetail = (props: IPayloadDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { payloadEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="payloadDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.payload.detail.title">Payload</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{payloadEntity.id}</dd>
          <dt>
            <span id="contentString">
              <Translate contentKey="hcpNphiesPortalSimpleApp.payload.contentString">Content String</Translate>
            </span>
          </dt>
          <dd>{payloadEntity.contentString}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.payload.contentAttachment">Content Attachment</Translate>
          </dt>
          <dd>{payloadEntity.contentAttachment ? payloadEntity.contentAttachment.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.payload.contentReference">Content Reference</Translate>
          </dt>
          <dd>{payloadEntity.contentReference ? payloadEntity.contentReference.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.payload.communication">Communication</Translate>
          </dt>
          <dd>{payloadEntity.communication ? payloadEntity.communication.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.payload.communicationRequest">Communication Request</Translate>
          </dt>
          <dd>{payloadEntity.communicationRequest ? payloadEntity.communicationRequest.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/payload" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payload/${payloadEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ payload }: IRootState) => ({
  payloadEntity: payload.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayloadDetail);
