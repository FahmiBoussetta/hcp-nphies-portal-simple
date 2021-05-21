import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOrganization } from 'app/shared/model/organization.model';
import { getEntities as getOrganizations } from 'app/entities/organization/organization.reducer';
import { getEntity, updateEntity, createEntity, reset } from './hospitalization.reducer';
import { IHospitalization } from 'app/shared/model/hospitalization.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHospitalizationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HospitalizationUpdate = (props: IHospitalizationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { hospitalizationEntity, organizations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/hospitalization');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOrganizations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...hospitalizationEntity,
        ...values,
        origin: organizations.find(it => it.id.toString() === values.originId.toString()),
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
          <h2 id="hcpNphiesPortalSimpleApp.hospitalization.home.createOrEditLabel" data-cy="HospitalizationCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.home.createOrEditLabel">
              Create or edit a Hospitalization
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : hospitalizationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="hospitalization-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="hospitalization-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="admitSourceLabel" for="hospitalization-admitSource">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.admitSource">Admit Source</Translate>
                </Label>
                <AvInput
                  id="hospitalization-admitSource"
                  data-cy="admitSource"
                  type="select"
                  className="form-control"
                  name="admitSource"
                  value={(!isNew && hospitalizationEntity.admitSource) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.AdmitSourceEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="reAdmissionLabel" for="hospitalization-reAdmission">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.reAdmission">Re Admission</Translate>
                </Label>
                <AvInput
                  id="hospitalization-reAdmission"
                  data-cy="reAdmission"
                  type="select"
                  className="form-control"
                  name="reAdmission"
                  value={(!isNew && hospitalizationEntity.reAdmission) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.ReAdmissionEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dischargeDispositionLabel" for="hospitalization-dischargeDisposition">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.dischargeDisposition">Discharge Disposition</Translate>
                </Label>
                <AvInput
                  id="hospitalization-dischargeDisposition"
                  data-cy="dischargeDisposition"
                  type="select"
                  className="form-control"
                  name="dischargeDisposition"
                  value={(!isNew && hospitalizationEntity.dischargeDisposition) || 'Todo'}
                >
                  <option value="Todo">{translate('hcpNphiesPortalSimpleApp.DischargeDispositionEnum.Todo')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="hospitalization-origin">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.hospitalization.origin">Origin</Translate>
                </Label>
                <AvInput id="hospitalization-origin" data-cy="origin" type="select" className="form-control" name="originId">
                  <option value="" key="0" />
                  {organizations
                    ? organizations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/hospitalization" replace color="info">
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
  organizations: storeState.organization.entities,
  hospitalizationEntity: storeState.hospitalization.entity,
  loading: storeState.hospitalization.loading,
  updating: storeState.hospitalization.updating,
  updateSuccess: storeState.hospitalization.updateSuccess,
});

const mapDispatchToProps = {
  getOrganizations,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HospitalizationUpdate);
