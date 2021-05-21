package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Acknowledgement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Acknowledgement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcknowledgementRepository extends JpaRepository<Acknowledgement, Long> {}
