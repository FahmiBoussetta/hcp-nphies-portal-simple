package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.ListCommunicationReasonEnum;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ListCommunicationReasonEnum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListCommunicationReasonEnumRepository extends JpaRepository<ListCommunicationReasonEnum, Long> {}
