package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.CommunicationRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CommunicationRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommunicationRequestRepository extends JpaRepository<CommunicationRequest, Long> {}
