import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './suffixes.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISuffixesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SuffixesDetail = (props: ISuffixesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { suffixesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="suffixesDetailsHeading">
          <Translate contentKey="hcpNphiesPortalSimpleApp.suffixes.detail.title">Suffixes</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{suffixesEntity.id}</dd>
          <dt>
            <span id="suffix">
              <Translate contentKey="hcpNphiesPortalSimpleApp.suffixes.suffix">Suffix</Translate>
            </span>
          </dt>
          <dd>{suffixesEntity.suffix}</dd>
          <dt>
            <Translate contentKey="hcpNphiesPortalSimpleApp.suffixes.human">Human</Translate>
          </dt>
          <dd>{suffixesEntity.human ? suffixesEntity.human.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/suffixes" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/suffixes/${suffixesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ suffixes }: IRootState) => ({
  suffixesEntity: suffixes.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SuffixesDetail);
