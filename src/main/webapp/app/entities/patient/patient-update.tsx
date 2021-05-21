import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { getEntity, updateEntity, createEntity, reset } from './patient.reducer';
import { IPatient } from 'app/shared/model/patient.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPatientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PatientUpdate = (props: IPatientUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { patientEntity, contacts, addresses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/patient');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getContacts();
    props.getAddresses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.start = convertDateTimeToServer(values.start);
    values.end = convertDateTimeToServer(values.end);

    if (errors.length === 0) {
      const entity = {
        ...patientEntity,
        ...values,
        contacts: contacts.find(it => it.id.toString() === values.contactsId.toString()),
        address: addresses.find(it => it.id.toString() === values.addressId.toString()),
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
          <h2 id="hcpNphiesPortalSimpleApp.patient.home.createOrEditLabel" data-cy="PatientCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.patient.home.createOrEditLabel">Create or edit a Patient</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : patientEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="patient-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="patient-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="guidLabel" for="patient-guid">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.guid">Guid</Translate>
                </Label>
                <AvField id="patient-guid" data-cy="guid" type="text" name="guid" />
              </AvGroup>
              <AvGroup>
                <Label id="forceIdLabel" for="patient-forceId">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.forceId">Force Id</Translate>
                </Label>
                <AvField id="patient-forceId" data-cy="forceId" type="text" name="forceId" />
              </AvGroup>
              <AvGroup>
                <Label id="residentNumberLabel" for="patient-residentNumber">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.residentNumber">Resident Number</Translate>
                </Label>
                <AvField id="patient-residentNumber" data-cy="residentNumber" type="text" name="residentNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="passportNumberLabel" for="patient-passportNumber">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.passportNumber">Passport Number</Translate>
                </Label>
                <AvField id="patient-passportNumber" data-cy="passportNumber" type="text" name="passportNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="nationalHealthIdLabel" for="patient-nationalHealthId">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.nationalHealthId">National Health Id</Translate>
                </Label>
                <AvField id="patient-nationalHealthId" data-cy="nationalHealthId" type="text" name="nationalHealthId" />
              </AvGroup>
              <AvGroup>
                <Label id="iqamaLabel" for="patient-iqama">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.iqama">Iqama</Translate>
                </Label>
                <AvField id="patient-iqama" data-cy="iqama" type="text" name="iqama" />
              </AvGroup>
              <AvGroup>
                <Label id="religionLabel" for="patient-religion">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.religion">Religion</Translate>
                </Label>
                <AvInput
                  id="patient-religion"
                  data-cy="religion"
                  type="select"
                  className="form-control"
                  name="religion"
                  value={(!isNew && patientEntity.religion) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.ReligionEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="patient-gender">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="patient-gender"
                  data-cy="gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && patientEntity.gender) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.AdministrativeGenderEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="startLabel" for="patient-start">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.start">Start</Translate>
                </Label>
                <AvInput
                  id="patient-start"
                  data-cy="start"
                  type="datetime-local"
                  className="form-control"
                  name="start"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.patientEntity.start)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endLabel" for="patient-end">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.end">End</Translate>
                </Label>
                <AvInput
                  id="patient-end"
                  data-cy="end"
                  type="datetime-local"
                  className="form-control"
                  name="end"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.patientEntity.end)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="maritalStatusLabel" for="patient-maritalStatus">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.maritalStatus">Marital Status</Translate>
                </Label>
                <AvInput
                  id="patient-maritalStatus"
                  data-cy="maritalStatus"
                  type="select"
                  className="form-control"
                  name="maritalStatus"
                  value={(!isNew && patientEntity.maritalStatus) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.MaritalStatusEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="patient-contacts">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.contacts">Contacts</Translate>
                </Label>
                <AvInput id="patient-contacts" data-cy="contacts" type="select" className="form-control" name="contactsId">
                  <option value="" key="0" />
                  {contacts
                    ? contacts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="patient-address">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.patient.address">Address</Translate>
                </Label>
                <AvInput id="patient-address" data-cy="address" type="select" className="form-control" name="addressId">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/patient" replace color="info">
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
  contacts: storeState.contact.entities,
  addresses: storeState.address.entities,
  patientEntity: storeState.patient.entity,
  loading: storeState.patient.loading,
  updating: storeState.patient.updating,
  updateSuccess: storeState.patient.updateSuccess,
});

const mapDispatchToProps = {
  getContacts,
  getAddresses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PatientUpdate);
