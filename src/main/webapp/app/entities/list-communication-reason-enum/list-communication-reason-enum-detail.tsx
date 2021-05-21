import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './list-communication-reason-enum.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IListCommunicationReasonEnumDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ListCommunicationReasonEnumDetail = (props: IListCommunicationReasonEnumDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { listCommunicationReasonEnumEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="listCommunicationReasonEnumDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.detail.title">ListCommunicationReasonEnum</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{listCommunicationReasonEnumEntity.id}</dd>
          <dt>
            <span id="cr">
              <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.cr">Cr</Translate>
            </span>
          </dt>
          <dd>{listCommunicationReasonEnumEntity.cr}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.listCommunicationReasonEnum.communication">Communication</Translate>
          </dt>
          <dd>{listCommunicationReasonEnumEntity.communication ? listCommunicationReasonEnumEntity.communication.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/list-communication-reason-enum" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/list-communication-reason-enum/${listCommunicationReasonEnumEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ listCommunicationReasonEnum }: IRootState) => ({
  listCommunicationReasonEnumEntity: listCommunicationReasonEnum.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListCommunicationReasonEnumDetail);
