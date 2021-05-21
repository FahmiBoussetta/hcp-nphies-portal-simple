import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuantity } from 'app/shared/model/quantity.model';
import { getEntities as getQuantities } from 'app/entities/quantity/quantity.reducer';
import { IAttachment } from 'app/shared/model/attachment.model';
import { getEntities as getAttachments } from 'app/entities/attachment/attachment.reducer';
import { IReferenceIdentifier } from 'app/shared/model/reference-identifier.model';
import { getEntities as getReferenceIdentifiers } from 'app/entities/reference-identifier/reference-identifier.reducer';
import { IClaim } from 'app/shared/model/claim.model';
import { getEntities as getClaims } from 'app/entities/claim/claim.reducer';
import { getEntity, updateEntity, createEntity, reset } from './supporting-info.reducer';
import { ISupportingInfo } from 'app/shared/model/supporting-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISupportingInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupportingInfoUpdate = (props: ISupportingInfoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { supportingInfoEntity, quantities, attachments, referenceIdentifiers, claims, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/supporting-info');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getQuantities();
    props.getAttachments();
    props.getReferenceIdentifiers();
    props.getClaims();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.timing = convertDateTimeToServer(values.timing);
    values.timingEnd = convertDateTimeToServer(values.timingEnd);

    if (errors.length === 0) {
      const entity = {
        ...supportingInfoEntity,
        ...values,
        valueQuantity: quantities.find(it => it.id.toString() === values.valueQuantityId.toString()),
        valueAttachment: attachments.find(it => it.id.toString() === values.valueAttachmentId.toString()),
        valueReference: referenceIdentifiers.find(it => it.id.toString() === values.valueReferenceId.toString()),
        claim: claims.find(it => it.id.toString() === values.claimId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hcpNphiesPortalSimpleApp.supportingInfo.home.createOrEditLabel" data-cy="SupportingInfoCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.home.createOrEditLabel">
              Create or edit a SupportingInfo
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : supportingInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="supporting-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="supporting-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sequenceLabel" for="supporting-info-sequence">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.sequence">Sequence</Translate>
                </Label>
                <AvField id="supporting-info-sequence" data-cy="sequence" type="string" className="form-control" name="sequence" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLOINCLabel" for="supporting-info-codeLOINC">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeLOINC">Code LOINC</Translate>
                </Label>
                <AvField id="supporting-info-codeLOINC" data-cy="codeLOINC" type="text" name="codeLOINC" />
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="supporting-info-category">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.category">Category</Translate>
                </Label>
                <AvInput
                  id="supporting-info-category"
                  data-cy="category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && supportingInfoEntity.category) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.SupportingInfoCategoryEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="codeVisitLabel" for="supporting-info-codeVisit">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeVisit">Code Visit</Translate>
                </Label>
                <AvInput
                  id="supporting-info-codeVisit"
                  data-cy="codeVisit"
                  type="select"
                  className="form-control"
                  name="codeVisit"
                  value={(!isNew && supportingInfoEntity.codeVisit) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.SupportingInfoCodeVisitEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="codeFdiOralLabel" for="supporting-info-codeFdiOral">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.codeFdiOral">Code Fdi Oral</Translate>
                </Label>
                <AvInput
                  id="supporting-info-codeFdiOral"
                  data-cy="codeFdiOral"
                  type="select"
                  className="form-control"
                  name="codeFdiOral"
                  value={(!isNew && supportingInfoEntity.codeFdiOral) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.SupportingInfoCodeFdiEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="timingLabel" for="supporting-info-timing">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.timing">Timing</Translate>
                </Label>
                <AvInput
                  id="supporting-info-timing"
                  data-cy="timing"
                  type="datetime-local"
                  className="form-control"
                  name="timing"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.supportingInfoEntity.timing)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="timingEndLabel" for="supporting-info-timingEnd">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.timingEnd">Timing End</Translate>
                </Label>
                <AvInput
                  id="supporting-info-timingEnd"
                  data-cy="timingEnd"
                  type="datetime-local"
                  className="form-control"
                  name="timingEnd"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.supportingInfoEntity.timingEnd)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="valueBooleanLabel">
                  <AvInput
                    id="supporting-info-valueBoolean"
                    data-cy="valueBoolean"
                    type="checkbox"
                    className="form-check-input"
                    name="valueBoolean"
                  />
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueBoolean">Value Boolean</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="valueStringLabel" for="supporting-info-valueString">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueString">Value String</Translate>
                </Label>
                <AvField id="supporting-info-valueString" data-cy="valueString" type="text" name="valueString" />
              </AvGroup>
              <AvGroup>
                <Label id="reasonLabel" for="supporting-info-reason">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.reason">Reason</Translate>
                </Label>
                <AvInput
                  id="supporting-info-reason"
                  data-cy="reason"
                  type="select"
                  className="form-control"
                  name="reason"
                  value={(!isNew && supportingInfoEntity.reason) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.SupportingInfoReasonEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="reasonMissingToothLabel" for="supporting-info-reasonMissingTooth">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.reasonMissingTooth">Reason Missing Tooth</Translate>
                </Label>
                <AvInput
                  id="supporting-info-reasonMissingTooth"
                  data-cy="reasonMissingTooth"
                  type="select"
                  className="form-control"
                  name="reasonMissingTooth"
                  value={(!isNew && supportingInfoEntity.reasonMissingTooth) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.SupportingInfoReasonMissingToothEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="supporting-info-valueQuantity">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueQuantity">Value Quantity</Translate>
                </Label>
                <AvInput
                  id="supporting-info-valueQuantity"
                  data-cy="valueQuantity"
                  type="select"
                  className="form-control"
                  name="valueQuantityId"
                >
                  <option value="" key="0" />
                  {quantities
                    ? quantities.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="supporting-info-valueAttachment">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueAttachment">Value Attachment</Translate>
                </Label>
                <AvInput
                  id="supporting-info-valueAttachment"
                  data-cy="valueAttachment"
                  type="select"
                  className="form-control"
                  name="valueAttachmentId"
                >
                  <option value="" key="0" />
                  {attachments
                    ? attachments.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="supporting-info-valueReference">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.valueReference">Value Reference</Translate>
                </Label>
                <AvInput
                  id="supporting-info-valueReference"
                  data-cy="valueReference"
                  type="select"
                  className="form-control"
                  name="valueReferenceId"
                >
                  <option value="" key="0" />
                  {referenceIdentifiers
                    ? referenceIdentifiers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="supporting-info-claim">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.supportingInfo.claim">Claim</Translate>
                </Label>
                <AvInput id="supporting-info-claim" data-cy="claim" type="select" className="form-control" name="claimId">
                  <option value="" key="0" />
                  {claims
                    ? claims.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/supporting-info" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  quantities: storeState.quantity.entities,
  attachments: storeState.attachment.entities,
  referenceIdentifiers: storeState.referenceIdentifier.entities,
  claims: storeState.claim.entities,
  supportingInfoEntity: storeState.supportingInfo.entity,
  loading: storeState.supportingInfo.loading,
  updating: storeState.supportingInfo.updating,
  updateSuccess: storeState.supportingInfo.updateSuccess,
});

const mapDispatchToProps = {
  getQuantities,
  getAttachments,
  getReferenceIdentifiers,
  getClaims,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupportingInfoUpdate);
