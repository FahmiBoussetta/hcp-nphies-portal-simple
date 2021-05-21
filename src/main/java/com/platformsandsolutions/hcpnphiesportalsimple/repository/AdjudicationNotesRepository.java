package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationNotes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AdjudicationNotes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjudicationNotesRepository extends JpaRepository<AdjudicationNotes, Long> {}
