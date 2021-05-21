import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contact.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContactDetail = (props: IContactDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { contactEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="contactDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.contact.detail.title">Contact</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{contactEntity.id}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="hcpNphiesPortalSimpleApp.contact.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{contactEntity.phone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="hcpNphiesPortalSimpleApp.contact.email">Email</Translate>
            </span>
          </dt>
          <dd>{contactEntity.email}</dd>
          <dt>
            <span id="mobile">
              <Translate contentKey="hcpNphiesPortalSimpleApp.contact.mobile">Mobile</Translate>
            </span>
          </dt>
          <dd>{contactEntity.mobile}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="hcpNphiesPortalSimpleApp.contact.url">Url</Translate>
            </span>
          </dt>
          <dd>{contactEntity.url}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.contact.name">Name</Translate>
          </dt>
          <dd>{contactEntity.name ? contactEntity.name.id : ''}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.contact.organization">Organization</Translate>
          </dt>
          <dd>{contactEntity.organization ? contactEntity.organization.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/contact" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contact/${contactEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ contact }: IRootState) => ({
  contactEntity: contact.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);
