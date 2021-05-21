import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './diagnosis.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiagnosisDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DiagnosisDetail = (props: IDiagnosisDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { diagnosisEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="diagnosisDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.detail.title">Diagnosis</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{diagnosisEntity.id}</dd>
          <dt>
            <span id="sequence">
              <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.sequence">Sequence</Translate>
            </span>
          </dt>
          <dd>{diagnosisEntity.sequence}</dd>
          <dt>
            <span id="diagnosis">
              <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.diagnosis">Diagnosis</Translate>
            </span>
          </dt>
          <dd>{diagnosisEntity.diagnosis}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.type">Type</Translate>
            </span>
          </dt>
          <dd>{diagnosisEntity.type}</dd>
          <dt>
            <span id="onAdmission">
              <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.onAdmission">On Admission</Translate>
            </span>
          </dt>
          <dd>{diagnosisEntity.onAdmission}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.diagnosis.claim">Claim</Translate>
          </dt>
          <dd>{diagnosisEntity.claim ? diagnosisEntity.claim.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/diagnosis" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/diagnosis/${diagnosisEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ diagnosis }: IRootState) => ({
  diagnosisEntity: diagnosis.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosisDetail);
