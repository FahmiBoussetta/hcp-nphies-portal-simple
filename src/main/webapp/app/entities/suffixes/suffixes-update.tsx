import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHumanName } from 'app/shared/model/human-name.model';
import { getEntities as getHumanNames } from 'app/entities/human-name/human-name.reducer';
import { getEntity, updateEntity, createEntity, reset } from './suffixes.reducer';
import { ISuffixes } from 'app/shared/model/suffixes.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISuffixesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SuffixesUpdate = (props: ISuffixesUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { suffixesEntity, humanNames, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/suffixes');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getHumanNames();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...suffixesEntity,
        ...values,
        human: humanNames.find(it => it.id.toString() === values.humanId.toString()),
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
          <h2 id="hcpNphiesPortalSimpleApp.suffixes.home.createOrEditLabel" data-cy="SuffixesCreateUpdateHeading">
            <Translate contentKey="hcpNphiesPortalSimpleApp.suffixes.home.createOrEditLabel">Create or edit a Suffixes</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : suffixesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="suffixes-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="suffixes-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="suffixLabel" for="suffixes-suffix">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.suffixes.suffix">Suffix</Translate>
                </Label>
                <AvField id="suffixes-suffix" data-cy="suffix" type="text" name="suffix" />
              </AvGroup>
              <AvGroup>
                <Label for="suffixes-human">
                  <Translate contentKey="hcpNphiesPortalSimpleApp.suffixes.human">Human</Translate>
                </Label>
                <AvInput id="suffixes-human" data-cy="human" type="select" className="form-control" name="humanId">
                  <option value="" key="0" />
                  {humanNames
                    ? humanNames.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/suffixes" replace color="info">
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
  humanNames: storeState.humanName.entities,
  suffixesEntity: storeState.suffixes.entity,
  loading: storeState.suffixes.loading,
  updating: storeState.suffixes.updating,
  updateSuccess: storeState.suffixes.updateSuccess,
});

const mapDispatchToProps = {
  getHumanNames,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SuffixesUpdate);
