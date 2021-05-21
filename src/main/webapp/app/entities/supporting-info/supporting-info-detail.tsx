import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './supporting-info.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupportingInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupportingInfoDetail = (props: ISupportingInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { supportingInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="supportingInfoDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.detail.title">SupportingInfo</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.id}</dd>
          <dt>
            <span id="sequence">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.sequence">Sequence</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.sequence}</dd>
          <dt>
            <span id="codeLOINC">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeLOINC">Code LOINC</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.codeLOINC}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.category">Category</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.category}</dd>
          <dt>
            <span id="codeVisit">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeVisit">Code Visit</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.codeVisit}</dd>
          <dt>
            <span id="codeFdiOral">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeFdiOral">Code Fdi Oral</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.codeFdiOral}</dd>
          <dt>
            <span id="timing">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.timing">Timing</Translate>
            </span>
          </dt>
          <dd>
            {supportingInfoEntity.timing ? <TextFormat value={supportingInfoEntity.timing} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="timingEnd">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.timingEnd">Timing End</Translate>
            </span>
          </dt>
          <dd>
            {supportingInfoEntity.timingEnd ? (
              <TextFormat value={supportingInfoEntity.timingEnd} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="valueBoolean">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueBoolean">Value Boolean</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.valueBoolean ? 'true' : 'false'}</dd>
          <dt>
            <span id="valueString">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueString">Value String</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.valueString}</dd>
          <dt>
            <span id="reason">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.reason">Reason</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.reason}</dd>
          <dt>
            <span id="reasonMissingTooth">
              <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.reasonMissingTooth">Reason Missing Tooth</Translate>
            </span>
          </dt>
          <dd>{supportingInfoEntity.reasonMissingTooth}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueQuantity">Value Quantity</Translate>
          </dt>
          <dd>{supportingInfoEntity.valueQuantity ? supportingInfoEntity.valueQuantity.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueAttachment">Value Attachment</Translate>
          </dt>
          <dd>{supportingInfoEntity.valueAttachment ? supportingInfoEntity.valueAttachment.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueReference">Value Reference</Translate>
          </dt>
          <dd>{supportingInfoEntity.valueReference ? supportingInfoEntity.valueReference.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.claim">Claim</Translate>
          </dt>
          <dd>{supportingInfoEntity.claim ? supportingInfoEntity.claim.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/supporting-info" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/supporting-info/${supportingInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ supportingInfo }: IRootState) => ({
  supportingInfoEntity: supportingInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupportingInfoDetail);
