package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.InformationSequence;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InformationSequence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformationSequenceRepository extends JpaRepository<InformationSequence, Long> {}
