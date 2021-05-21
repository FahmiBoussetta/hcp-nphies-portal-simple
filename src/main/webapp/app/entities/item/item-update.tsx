import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClaim } from 'app/shared/model/claim.model';
import { getEntities as getClaims } from 'app/entities/claim/claim.reducer';
import { getEntity, updateEntity, createEntity, reset } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ItemUpdate = (props: IItemUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { itemEntity, claims, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/item');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getClaims();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.servicedDate = convertDateTimeToServer(values.servicedDate);
    values.servicedDateStart = convertDateTimeToServer(values.servicedDateStart);
    values.servicedDateEnd = convertDateTimeToServer(values.servicedDateEnd);

    if (errors.length === 0) {
      const entity = {
        ...itemEntity,
        ...values,
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
          <h2 id="hcpNphiesPortalSimpleApp.item.home.createOrEditLabel" data-cy="ItemCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.item.home.createOrEditLabel">Create or edit a Item</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : itemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sequenceLabel" for="item-sequence">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.sequence">Sequence</Translate>
                </Label>
                <AvField id="item-sequence" data-cy="sequence" type="string" className="form-control" name="sequence" />
              </AvGroup>
              <AvGroup check>
                <Label id="isPackageLabel">
                  <AvInput id="item-isPackage" data-cy="isPackage" type="checkbox" className="form-check-input" name="isPackage" />
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.isPackage">Is Package</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="taxLabel" for="item-tax">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.tax">Tax</Translate>
                </Label>
                <AvField id="item-tax" data-cy="tax" type="text" name="tax" />
              </AvGroup>
              <AvGroup>
                <Label id="payerShareLabel" for="item-payerShare">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.payerShare">Payer Share</Translate>
                </Label>
                <AvField id="item-payerShare" data-cy="payerShare" type="text" name="payerShare" />
              </AvGroup>
              <AvGroup>
                <Label id="patientShareLabel" for="item-patientShare">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.patientShare">Patient Share</Translate>
                </Label>
                <AvField id="item-patientShare" data-cy="patientShare" type="text" name="patientShare" />
              </AvGroup>
              <AvGroup>
                <Label id="careTeamSequenceLabel" for="item-careTeamSequence">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.careTeamSequence">Care Team Sequence</Translate>
                </Label>
                <AvField
                  id="item-careTeamSequence"
                  data-cy="careTeamSequence"
                  type="string"
                  className="form-control"
                  name="careTeamSequence"
                />
              </AvGroup>
              <AvGroup>
                <Label id="transportationSRCALabel" for="item-transportationSRCA">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.transportationSRCA">Transportation SRCA</Translate>
                </Label>
                <AvField id="item-transportationSRCA" data-cy="transportationSRCA" type="text" name="transportationSRCA" />
              </AvGroup>
              <AvGroup>
                <Label id="imagingLabel" for="item-imaging">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.imaging">Imaging</Translate>
                </Label>
                <AvField id="item-imaging" data-cy="imaging" type="text" name="imaging" />
              </AvGroup>
              <AvGroup>
                <Label id="laboratoryLabel" for="item-laboratory">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.laboratory">Laboratory</Translate>
                </Label>
                <AvField id="item-laboratory" data-cy="laboratory" type="text" name="laboratory" />
              </AvGroup>
              <AvGroup>
                <Label id="medicalDeviceLabel" for="item-medicalDevice">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.medicalDevice">Medical Device</Translate>
                </Label>
                <AvField id="item-medicalDevice" data-cy="medicalDevice" type="text" name="medicalDevice" />
              </AvGroup>
              <AvGroup>
                <Label id="oralHealthIPLabel" for="item-oralHealthIP">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.oralHealthIP">Oral Health IP</Translate>
                </Label>
                <AvField id="item-oralHealthIP" data-cy="oralHealthIP" type="text" name="oralHealthIP" />
              </AvGroup>
              <AvGroup>
                <Label id="oralHealthOPLabel" for="item-oralHealthOP">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.oralHealthOP">Oral Health OP</Translate>
                </Label>
                <AvField id="item-oralHealthOP" data-cy="oralHealthOP" type="text" name="oralHealthOP" />
              </AvGroup>
              <AvGroup>
                <Label id="procedureLabel" for="item-procedure">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.procedure">Procedure</Translate>
                </Label>
                <AvField id="item-procedure" data-cy="procedure" type="text" name="procedure" />
              </AvGroup>
              <AvGroup>
                <Label id="servicesLabel" for="item-services">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.services">Services</Translate>
                </Label>
                <AvField id="item-services" data-cy="services" type="text" name="services" />
              </AvGroup>
              <AvGroup>
                <Label id="medicationCodeLabel" for="item-medicationCode">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.medicationCode">Medication Code</Translate>
                </Label>
                <AvField id="item-medicationCode" data-cy="medicationCode" type="text" name="medicationCode" />
              </AvGroup>
              <AvGroup>
                <Label id="servicedDateLabel" for="item-servicedDate">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.servicedDate">Serviced Date</Translate>
                </Label>
                <AvInput
                  id="item-servicedDate"
                  data-cy="servicedDate"
                  type="datetime-local"
                  className="form-control"
                  name="servicedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.itemEntity.servicedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="servicedDateStartLabel" for="item-servicedDateStart">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.servicedDateStart">Serviced Date Start</Translate>
                </Label>
                <AvInput
                  id="item-servicedDateStart"
                  data-cy="servicedDateStart"
                  type="datetime-local"
                  className="form-control"
                  name="servicedDateStart"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.itemEntity.servicedDateStart)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="servicedDateEndLabel" for="item-servicedDateEnd">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.servicedDateEnd">Serviced Date End</Translate>
                </Label>
                <AvInput
                  id="item-servicedDateEnd"
                  data-cy="servicedDateEnd"
                  type="datetime-local"
                  className="form-control"
                  name="servicedDateEnd"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.itemEntity.servicedDateEnd)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="quantityLabel" for="item-quantity">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.quantity">Quantity</Translate>
                </Label>
                <AvField id="item-quantity" data-cy="quantity" type="string" className="form-control" name="quantity" />
              </AvGroup>
              <AvGroup>
                <Label id="unitPriceLabel" for="item-unitPrice">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.unitPrice">Unit Price</Translate>
                </Label>
                <AvField id="item-unitPrice" data-cy="unitPrice" type="string" className="form-control" name="unitPrice" />
              </AvGroup>
              <AvGroup>
                <Label id="factorLabel" for="item-factor">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.factor">Factor</Translate>
                </Label>
                <AvField id="item-factor" data-cy="factor" type="text" name="factor" />
              </AvGroup>
              <AvGroup>
                <Label id="bodySiteLabel" for="item-bodySite">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.bodySite">Body Site</Translate>
                </Label>
                <AvInput
                  id="item-bodySite"
                  data-cy="bodySite"
                  type="select"
                  className="form-control"
                  name="bodySite"
                  value={(!isNew && itemEntity.bodySite) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.BodySiteEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="subSiteLabel" for="item-subSite">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.subSite">Sub Site</Translate>
                </Label>
                <AvInput
                  id="item-subSite"
                  data-cy="subSite"
                  type="select"
                  className="form-control"
                  name="subSite"
                  value={(!isNew && itemEntity.subSite) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.SubSiteEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="item-claim">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.item.claim">Claim</Translate>
                </Label>
                <AvInput id="item-claim" data-cy="claim" type="select" className="form-control" name="claimId">
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
              <Button tag={Link} id="cancel-save" to="/item" replace color="info">
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
  claims: storeState.claim.entities,
  itemEntity: storeState.item.entity,
  loading: storeState.item.loading,
  updating: storeState.item.updating,
  updateSuccess: storeState.item.updateSuccess,
});

const mapDispatchToProps = {
  getClaims,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdate);
